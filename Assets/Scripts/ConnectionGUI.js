var remoteIP = "127.0.0.1";
var remotePort = 25000;
var listenPort = 25000;
var useNAT = false;
var yourIP = "";
var yourPort = "";

//var posArray = { new Vector3(953.9844, 12.14996, 969.1106), new Vector3(886.1172, 12.14996, 973.1924) };
var playerPrefab: GameObject;
var alreadySpawned = false;
var lastSpawned = 0;

var clientPlayer : NetworkPlayer; 
var clientConnected = false;
private var playerArray = [];

private var refreshing: boolean;
public var gameState = 0;
private var hostData: HostData[];

var roundTimer = 0f;
var lobbyTimer = 0f;
var roundActive = false;

function startServer(){
	Debug.Log("Starting Server!");
	Network.InitializeServer(32, listenPort, !Network.HavePublicAddress);
	MasterServer.RegisterHost("ADANGEROUSGAME", "My Game", "");
}

function initRound() {
	roundTimer = 300;
	spawnPlayers();
	roundActive = true;
}

function endRound() {
	//TODO
	Debug.Log("Ending Round");
}

function spawnPlayers() {
	Debug.Log("Spawning players");
	var serverPlayerRole : int = 0;
	var clientPlayerRole : int = 1;
	spawnPlayer(serverPlayerRole);
	networkView.RPC("spawnPlayer", clientPlayer, clientPlayerRole);
}
		
@RPC
function spawnPlayer(ID : int){
	var camera = GameObject.Find("Main Camera");
	if(ID == 1){
		var player = Network.Instantiate(playerPrefab, new Vector3(1554.502, 114.8779, 791.5316), Quaternion.identity, 0);
		var hunterVal = player.GetComponent("PlayerDisableScript");
		hunterVal.hunter = true;
		camera.transform.position = player.transform.position;

	}
	else{
	
		//var serverPos = spawnObj.position + new Vector3(3f,0,0);
		var client = Network.Instantiate(playerPrefab, new Vector3(1507.119, 116.565, 906.2426), Quaternion.identity, 0);

		camera.transform.position = client.transform.position;
	}
}

function OnServerInitialized(){
	Debug.Log("Server Initialized");
}

//These two functions allow the game to spawn players simultaneously
//this function spawns the client player
function OnConnectedToServer(){

	Debug.Log("Connected to Server :-)");
}

//this function spawns the server player

function OnPlayerConnected(player : NetworkPlayer){
	clientPlayer = player;
	clientConnected = true;
	Debug.Log(player);
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

function Update(){
	if(refreshing){
		if(MasterServer.PollHostList().Length > 0){
			refreshing = false;
			Debug.Log(MasterServer.PollHostList().Length);
			hostData = MasterServer.PollHostList();
		}
	}
	if(Network.isServer && !roundActive) {	
		if(clientConnected) {
			Debug.Log("Starting round");
			initRound();
		}
	}
	if(roundActive) {
		roundTimer -= Time.deltaTime;
		if(roundTimer <= 0) {
			endRound();
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
	} else if(!roundActive) {
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
