#pragma strict

function Start () {
var tex : Texture = renderer.material.GetTexture ("_MainTex");
		if (tex){
			//print ("My MainTex is " + tex.name);
			}
		else {
			//print ("I have no _MainTex!");
			}
			
	//renderer.material.mainTexture = Resources.Load("CA_J", Texture2D);
}

function Update () {
   
}