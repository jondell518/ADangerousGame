
private var cc:CharacterController;
var rotationY = 0F;
var sensitivityX = 15F;
var sensitivityY = 15F;
var minimumX = -360F;
var maximumX = 360F;
var minimumY = -60F;
var maximumY = 60F;
function Awake(){




}
function Start () {


	cc = GetComponent(CharacterController);
	


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
		
	}
	else {
	
		
		//GetComponent("MouseLook").enabled = false;
		GetComponent("CharacterMotor").enabled = false;
		GetComponent("FPSInputController").enabled = false;
		//GetComponent("MainCamera").enabled = false;
	
	}


}