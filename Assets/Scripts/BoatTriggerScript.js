
var CG;
function Start () {
	
		//locate the network manager object, which holds information on the game state
		var temp = GameObject.Find("NetworkManager");
		CG = temp.GetComponent("ConnectionGUI");
		
		
		
}

function Update () {

}

function OnTriggerEnter(other: Collider){
	Debug.Log("TRIGGER CALLED");
	CG.gameState = 2;




}