
private var cc:CharacterController;
var rotationY = 0F;
var sensitivityX = 10f;
var sensitivityY = 10f;
var minimumX = -360F;
var maximumX = 360F;
var minimumY = -60F;
var maximumY = 60F; 
var hunter : boolean = false;
var CG;
function Awake(){




}
function Start () {


	cc = GetComponent(CharacterController);
	
	var temp = GameObject.Find("NetworkManager");
	CG = temp.GetComponent("ConnectionGUI");
	
	if(hunter){
			Debug.Log("You are the Hunter!");
			//GUI.Label(new Rect(400,20,250,40), "You are the hunter!");
			//renderer.material = hunterMaterial;
		}
		else{
			Debug.Log("You are being Hunted!");
			//GUI.Label(new Rect(400,20,250,40), "You are the hunted!");
			//renderer.material = huntedMaterial;

		}
	


}

function Update () {

	if(networkView.isMine){
		
		//GetComponent("MouseLook").enabled = true;
		GetComponent("CharacterMotor").enabled = true;
		GetComponent("FPSInputController").enabled = true;
		//var cam = GameObject.Find("First Person Controller/Main Camera").GetComponent(Camera);
		//cam.enabled = false;
		
		var camera = GameObject.Find("Main Camera");
		
		camera.transform.position = cc.transform.position;
		camera.transform.forward = cc.transform.forward;
		
		rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
		rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
		camera.transform.Rotate(-rotationY, 0, 0);
		cc.transform.Rotate(0, Input.GetAxis ("Mouse X")*sensitivityX, 0);
		
		
		var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		Debug.DrawRay(transform.position,ray.direction*100, Color.yellow);
		//ray call for debugging/testing purposes
		
		//handle the firing the gun, draw a ray based on the mouse position, if the ray collides with the hunted then its a hit
		if(Input.GetMouseButton(0) && hunter){
			Debug.Log("FIRING");
			var hit: RaycastHit;
			
			if(Physics.Raycast(ray, hit, 100)){
				if(hit.collider.gameObject.tag == "player" && !hit.collider.gameObject.GetComponent("PlayerDisableScript").hunter)
					Debug.Log("Hit the player");
					CG.gameState = 1;
					Debug.Log(CG.gameState);
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
	else {
	
		
		//GetComponent("MouseLook").enabled = false;
		GetComponent("CharacterMotor").enabled = false;
		GetComponent("FPSInputController").enabled = false;
		//GetComponent("MainCamera").enabled = false;
	
	}


}






@RPC
function loadLevel(level : String) {
	Application.LoadLevel(level);
}	

//Should be the code that handles the collision of the players, but does not work yet
function OnControllerColliderHit(hit: ControllerColliderHit){

	if(hit.collider.gameObject.tag == "Player")
		Debug.Log("HIT ANOTHER PLAYER");



}