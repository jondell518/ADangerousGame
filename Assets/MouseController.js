

var horizontal_speed : float = 2.0;
var vertical_speed : float = 2.0;


function Start () {

}

function Update () {
	
	var mouseX = horizontal_speed * Input.GetAxis("Mouse X");
	var mouseY = horizontal_speed * Input.GetAxis("Mouse Y");
	this.transform.LookAt(new Vector3(mouseX, mouseY, 0));
}