var speed: int = 5;
var gravity = 5;

var minimumY = -60F;
var maximumY = 60F;
private var cc:CharacterController;
var CG;

function Start () {

	cc = GetComponent(CharacterController);
	//locate the network manager object, which holds information on the game state
	var temp = GameObject.Find("NetworkManager");
	CG = temp.GetComponent("ConnectionGUI");
}

function Update () {

	if(networkView.isMine){

		cc.transform.Rotate(0, Input.GetAxis ("Mouse X"), 0);
		var moveDir = new Vector3(Input.GetAxis("Horizontal") * speed, -gravity, Input.GetAxis("Vertical") * speed);
		var direction = transform.TransformDirection(moveDir);
		cc.Move(direction * Time.deltaTime);
		var camera = GameObject.Find("Main Camera");
		
		camera.transform.position = cc.transform.position;
		camera.transform.forward = cc.transform.forward;

	}
	
	if(CG.gameState == 1){
	
		//Code for ending the game goes here, with a hunter victory
	
	}
	
	if(CG.gameState == 2){
	
		//Code for ending the game goes here, with a hunted victory
		
		Debug.Log("HUNTED WON!");
		
		//Load hunted won screen, should be synced across all clients as well.
		Application.LoadLevel("HuntedWonScene");
	
	}

	




}



function OnControllerColliderHit(hit: ControllerColliderHit){


	Debug.Log(hit.gameObject.tag);
	if(hit.collider.gameObject.tag == "Player")
		Debug.Log("HIT ANOTHER PLAYER");




}
















