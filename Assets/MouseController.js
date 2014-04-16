#pragma strict

var horizontal_speed : float = 2.0;
var vertical_speed : float = 2.0;

var mouse_vector : Vector2 = new Vector2(0, 0);

function Start () {

}

function Update () {
	var temp_mouse_vector : Vector2 = new Vector2(horizontal_speed * Input.GetAxisRaw("Mouse X"), vertical_speed * Input.GetAxisRaw("Mouse Y"));
	
	mouse_vector = new Vector2(Mathf.Clamp(-30, 30, mouse_vector.x + temp_mouse_vector.x), Mathf.Clamp(-90, 90, mouse_vector.y + temp_mouse_vector.y));
	Debug.Log(mouse_vector);
	gameObject.transform.rotation = Quaternion.Euler(mouse_vector.x, mouse_vector.y, 0);
}