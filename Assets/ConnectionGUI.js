var remoteIP = "127.0.0.1";
var remotePort = 25000;
var listenPort = 25000;
var useNAT = false;
var yourIP = "";
var yourPort = "";


var playerPrefab: GameObject;
var hunterSpawn: Transform;
var huntedSpawn: Transform;

var huntedMaterial: Material;
var hunterMaterial: Material;

var alreadySpawned = false;
var lastSpawned = 0;


private var refreshing: boolean;
public var gameState = 0;
private var hostData: HostData[];




function startServer(){
	Debug.Log("Starting Server!");
	Network.InitializeServer(32, listenPort, !Network.HavePublicAddress);
	MasterServer.RegisterHost("ADANGEROUSGAME", "My Game", "");
}


function spawnPlayer(ID){
	var camera = GameObject.Find("Main Camera");
	if(ID == 1){
		var player = Network.Instantiate(playerPrefab, hunterSpawn.position, Quaternion.identity, 0);
		var hunterVal = player.GetComponent("PlayerScript");
		hunterVal.hunter = true;
		player.renderer.material = hunterMaterial;
		camera.transform.position = player.transform.position;
		
	}
	else{
	
		//var serverPos = spawnObj.position + new Vector3(3f,0,0);
		var client = Network.Instantiate(playerPrefab, huntedSpawn.position, Quaternion.identity, 0);
		client.renderer.material = huntedMaterial;
		camera.transform.position = client.transform.position;
	}


}



function OnServerInitialized(){
	Debug.Log("Server Initialized");
	

}


//These two functions allow the game to spawn players simultaneously
//this function spawns the client player
function OnConnectedToServer(){

	
	
	
	spawnPlayer(0);

}

//this function spawns the server player
function OnPlayerConnected(){

	
	spawnPlayer(1);

}



function OnMasterServerEvent(mse:MasterServerEvent){


	if(mse == MasterServerEvent.RegistrationSucceeded)
	{
		Debug.Log("Host registered!");
	}
	

}

function refreshHostList(){

	MasterServer.RequestHostList("ADANGEROUSGAME");
	refreshing = true;




}

function update(){
	if(refreshing){
		if(MasterServer.PollHostList().Length > 0){
			refreshing = false;
			Debug.Log(MasterServer.PollHostList().Length);
			hostData = MasterServer.PollHostList();
		
		}
			
	}	
	



}


function OnGUI () {
	// Checking if you are connected to the server or not
	if (Network.peerType == NetworkPeerType.Disconnected) {
		// If not connected
	
		if (GUI.Button (new Rect(10,10,100,30),"Connect")) {
			Network.Connect(remoteIP, remotePort);
			
					
			
			
		}
		if (GUI.Button (new Rect(10,50,100,30),"Start Server")) {
			startServer();

			// Notify our objects that the level and the network is ready
			for (var go : GameObject in FindObjectsOfType(GameObject)) {
				go.SendMessage("OnNetworkLoadedLevel", 
				SendMessageOptions.DontRequireReceiver); 
			}
		}
	 
		// Fields to insert ip address and port 
		remoteIP = GUI.TextField(new Rect(120,10,100,20),remoteIP);
		remotePort = parseInt(GUI.TextField(new 
		Rect(230,10,40,20),remotePort.ToString()));
	} else {
		// Getting your ip address and port
		ipaddress = Network.player.ipAddress;
		port = Network.player.port.ToString();

		GUI.Label(new Rect(140,20,250,40),"IP Adress: "+ipaddress+":"+port);
		if (GUI.Button (new Rect(10,10,100,50),"Disconnect")) {
			// Disconnect from the server
			Network.Disconnect(200);
		}
	}
}

/*function OnConnectedToServer () {
	// Notify our objects that the level and the network are ready
	for (var go : GameObject in FindObjectsOfType(GameObject))
		go.SendMessage("OnNetworkLoadedLevel", 
		SendMessageOptions.DontRequireReceiver); 
}*/
