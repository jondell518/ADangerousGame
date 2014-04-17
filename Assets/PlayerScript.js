var speed: int = 5;
var gravity = 5;

var minimumY = -60F;
var maximumY = 60F;
private var cc:CharacterController;

function Start () {

	cc = GetComponent(CharacterController);
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
	




}