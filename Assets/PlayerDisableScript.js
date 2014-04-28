
private var cc:CharacterController;
var rotationY = 0F;
var sensitivityX = 15F;
var sensitivityY = 15F;
var minimumX = -360F;
var maximumX = 360F;
var minimumY = -60F;
var maximumY = 60F; 
var hunter : boolean = false;

function Awake(){




}
function Start () {


	cc = GetComponent(CharacterController);
	
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
			
			if(Physics.Raycast(ray, hit, 10)){
				if(hit.collider.gameObject.tag == "player" && !hit.collider.gameObject.GetComponent("PlayerDisableScript").hunter)
					Debug.Log("Hit the player");
					//CG.gameState = 1;
					//Debug.Log(CG.gameState);
			}
		}
		
		
		
		
	}
	else {
	
		
		//GetComponent("MouseLook").enabled = false;
		GetComponent("CharacterMotor").enabled = false;
		GetComponent("FPSInputController").enabled = false;
		//GetComponent("MainCamera").enabled = false;
	
	}


}