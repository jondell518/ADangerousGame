
private var cc:CharacterController;
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
		//camera.GetComponent("MouseLook").enabled = true;
		
		camera.transform.position = cc.transform.position;
		camera.transform.forward = cc.transform.forward;
		
	}
	else {
	
		
		//GetComponent("MouseLook").enabled = false;
		GetComponent("CharacterMotor").enabled = false;
		GetComponent("FPSInputController").enabled = false;
		//GetComponent("MainCamera").enabled = false;
	
	}


}