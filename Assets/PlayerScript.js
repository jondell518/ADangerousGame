var speed: int = 5;
var gravity = 5;


private var cc:CharacterController;

function Start () {

	cc = GetComponent(CharacterController);
}

function Update () {

	if(networkView.isMine){
		cc.Move(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, -gravity * Time.deltaTime, Input.GetAxis("Vertical") * speed * Time.deltaTime));
		var camera = GameObject.Find("Main Camera");
		camera.transform.position = cc.transform.position;
		camera.transform.LookAt(transform.forward);
	}
	




}