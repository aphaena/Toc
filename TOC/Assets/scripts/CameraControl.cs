using UnityEngine;
 
[AddComponentMenu("Camera-Control/Keyboard Orbit")]
 
public class CameraControl : MonoBehaviour {
    public Transform target;
    public float distance = -2.5f;
    public float zoomSpd = 2.0f;
 
    public float xSpeed = 200.0f;
    public float ySpeed = 200.0f;
 
    public int yMinLimit = 20;
    public int yMaxLimit = 90;
 
    private float x = -0.3f;
    private float y = 0.6f;
 
    public void Start () {
 
        x = -180;
        y = 25f;
		distance = 2.7f;
 
        // Make the rigid body not change rotation
        if (rigidbody)
            rigidbody.freezeRotation = true;
    }
 
    public void LateUpdate () {
        if (target) {
            x -= Input.GetAxis("Horizontal") * xSpeed * 0.02f;
            y += Input.GetAxis("Vertical") * ySpeed * 0.02f;
 
            y = ClampAngle(y, yMinLimit, yMaxLimit);
 
        	distance -= Input.GetAxis("Fire2") *zoomSpd* 0.02f;
            distance += Input.GetAxis("Fire3") *zoomSpd* 0.02f;
 
            Quaternion rotation = Quaternion.Euler(y, x, 0.0f);
            Vector3 position = rotation * new Vector3(0.0f, 0.0f, -distance) + target.position;
 
            transform.rotation = rotation;
            transform.position = position;
        }
    }
 
    public static float ClampAngle (float angle, float min, float max) {
        if (angle < -360.0f)
            angle += 360.0f;
        if (angle > 360.0f)
            angle -= 360.0f;
        return Mathf.Clamp (angle, min, max);
    }
}