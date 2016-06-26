using UnityEngine;
using System.Collections;
using System.Threading;

public class PiontBleu : MonoBehaviour {
	
	private int avancement;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void Awake ()
	{
		avancement=4;
	}
	
	void OnMouseDown() 
	{
		
		
		//transform.Translate(new Vector3(7.1f* Time.deltaTime,0,10 * Time.deltaTime));
		for(int i=0;i<3;i++)
		{		
			 StartCoroutine(WaitAndMove(i));	
		}
	}
	
	 void movePion()
	{
		if(avancement<15)
		{
			transform.Translate(new Vector3(0.118f ,0,0.1f  ));		
		}
		else
		{
			transform.Translate(new Vector3(0, 0.118f ,0.1f ));
		}
	}
	
	 IEnumerator WaitAndMove(float waitTime) {
		
        yield return new WaitForSeconds(waitTime);
		movePion();	
		 avancement++;
		//Debug.Log(rigidbody.position);
		//print("avancement:"+avancement);
        //print("WaitAndPrint " + Time.time);
    }
	
	
}
