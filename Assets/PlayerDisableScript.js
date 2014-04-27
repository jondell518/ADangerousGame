

function Start () {

}

function Update () {

	if(networkView.isMine){
		GetComponent("MouseLook").enabled = true;
		GetComponent("CharacterMotor").enabled = true;
		GetComponent("FPSInputController").enabled = true;
		
	}
	else {
		GetComponent("MouseLook").enabled = false;
		GetComponent("CharacterMotor").enabled = false;
		GetComponent("FPSInputController").enabled = false;
	
	}


}