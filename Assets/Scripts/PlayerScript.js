﻿var speed: int = 10;
var gravity = 5;

var minimumY = -60F;
var maximumY = 60F;
private var cc:CharacterController;
var CG;

 var bulletPrefab : GameObject;
 var hunter : boolean = false;


function Start () {

	cc = GetComponent(CharacterController);
	//locate the network manager object, which holds information on the game state
	var temp = GameObject.Find("NetworkManager");
	CG = temp.GetComponent("ConnectionGUI");
	
	

	if(hunter){
			Debug.Log("You are the Hunter!");
			//renderer.material = hunterMaterial;
	}
	else{
			Debug.Log("You are being Hunted!");
			//renderer.material = huntedMaterial;

	}
}

function Update () {

	//only allow the client controlling this player to use it
	if(networkView.isMine){

		cc.transform.Rotate(0, Input.GetAxis ("Mouse X")*2f, 0);

		var moveDir = new Vector3(Input.GetAxis("Horizontal") * speed, -gravity, Input.GetAxis("Vertical") * speed);
		var direction = transform.TransformDirection(moveDir);
		cc.Move(direction * Time.deltaTime);
		var camera = GameObject.Find("Main Camera");
		
		camera.transform.position = cc.transform.position;
		camera.transform.forward = cc.transform.forward;
	
	
		var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		//ray call for debugging/testing purposes
		
		//handle the firing the gun, draw a ray based on the mouse position, if the ray collides with the hunted then its a hit
		if(Input.GetMouseButton(0) && hunter){
			
			var hit: RaycastHit;
			 
			if(Physics.Raycast(ray, hit, 10)){
				if(hit.collider.gameObject.tag == "Player" && !hit.collider.gameObject.GetComponent("PlayerScript").hunter)
					Debug.Log("Hit the player");
					CG.gameState = 1;
					//Debug.Log(CG.gameState);
			}
		}
		
		if(CG.gameState == 1){
	
		//Code for ending the game goes here, with a hunter victory
		Debug.Log("HUNTER WON");
		
		//Load hunter won screen, should be synced across all clients as well.
		//Application.LoadLevel("HunterWonScene");
		networkView.RPC("loadLevel", RPCMode.AllBuffered, "HunterWonScene");
	
	}
	
		if(CG.gameState == 2){
		
			//Code for ending the game goes here, with a hunted victory
			
			Debug.Log("HUNTED WON!");
			
			//Load hunted won screen, should be synced across all clients as well.
			//Application.LoadLevel("HuntedWonScene");
			networkView.RPC("loadLevel", RPCMode.AllBuffered, "HuntedWonScene");
		
		}

	}
}

@RPC
function loadLevel(level : String) {
	Application.LoadLevel(level);
}

function OnGUI() {
	if(hunter) {
			GUI.TextField(new Rect(230,10,200,20),"You are the hunter! Find the other player and shoot them (Mouse click)");
			//Debug.DrawRay(transform.position,ray.direction * 10, Color.yellow);
	} else {
		GUI.TextField(new Rect(230,10,200,20),"You are the hunted! Reach the pole without getting killed!");
	}
}	

//Should be the code that handles the collision of the players, but does not work yet
function OnControllerColliderHit(hit: ControllerColliderHit){

	if(hit.collider.gameObject.tag == "Player")
		Debug.Log("HIT ANOTHER PLAYER");




}
















