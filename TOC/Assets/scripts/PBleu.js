#pragma strict
import System;
public var avancement = 1;
public var av_toc = true;
public var out_ok = false;
public var enter_ok = false;
public var pionIsOut = false;
public var piontNumber = 0;
public var originalRotationValue; // declare this as a Quaternion
public var nbpointOut=0;
public var positionPiont1=0;
public var positionPiont2=0;
public var positionPiont3=0;

var  rotationResetSpeed = 0.01f;
//_transform:Transform;
  
function Start () {
	originalRotationValue = transform.rotation; // save the initial rotation
}

function Update () {

}

function Awake ()
{
	avancement=31;
}

function OnMouseDown() 
{
	//transform.Translate(new Vector3(7.1f* Time.deltaTime,0,10 * Time.deltaTime));
	
	/*
	for( var i = 0 ; i < 3; i++)
	{		
	  	//StartCoroutine(WaitAndMove(1));	 
	  	yield WaitForSeconds(1);
		movePion();	
	 	avancement++;	
	}
	*/
}



function CaseConstructor( _case, _numCase)
{
	if( parseInt(_numCase.ToString()) < 10){ _case = _case+"0";}
	var ActiveCase = _case + _numCase.ToString();

	return ActiveCase;
}


function MoveInOutPiont(_dep, _piontNumber )
{
	Debug.Log(" dep "+ _dep+" av: "+ avancement);
	if(pionIsOut)
	{
		Debug.Log(" dep "+ _dep+" av: "+ avancement);
		var dep = Int32.Parse(_dep.ToString());
		for( var i = 0 ; i < dep; i++)
		{				
		  	//StartCoroutine(WaitAndMove(1));	 
		  	yield WaitForSeconds(1);
		  	avancement++;	
			movePion();	
		 
		}
	}
	else
	{
		
		pionIsOut=true;
		piontNumber = _piontNumber; 
		Move_First_for_Out();
	}
}

function Move_First_for_Out() 
{	
	//var targetPos = new Vector3(-0.3f, -125.4f, 1380.85f);
	// si out_ok est à 1 le pion peut sortir.
	if(piontNumber == 1)
	{ 
		Debug.Log("piontNumber == 1 : "+piontNumber);
		//transform.Translate(new Vector3(0, -0.122f ,0.1f ));		
			transform.position = Vector3.MoveTowards(transform.position, GameObject.Find("Case31").transform.position,0.3f);			
			//transform.Translate(new Vector3.MoveTowards(transform.position, GameObject.Find("Case31").transform.position,0.01f));
			positionPiont1=avancement;
		
	}

	if(piontNumber == 2)
	{ 
		Debug.Log("piontNumber == 2 : "+piontNumber);
		transform.Translate(new Vector3(0, -0.27f ,0.1f ));
		positionPiont2=avancement;
	}
	
	if(piontNumber == 3)
	{ 
		Debug.Log("piontNumber == 3 : "+piontNumber);
		transform.Translate(new Vector3(0, -0.40f ,0.1f ));
		positionPiont3=avancement;
	}
		
	//transform.position = new Vector3.Lerp(transform.position,targetPos,(Time.deltaTime*3)/Vector3.Distance(targetPos,transform.position));
	Debug.Log("transform.position: "+transform.position);

	return out_ok;
}


function movePion()
{
	Debug.Log("avancement: " + avancement);
	//transform.Translate(new Vector3(0, -0.118f ,0.1f ));
	
	if(avancement == 62 )
	{
	Debug.Log("avancement && enter_ok : " + avancement);
		avancement = 1;
		enter_ok =true;
	}
	var CaseX = CaseConstructor("Case", avancement);
	Debug.Log("avancement : " + avancement);
	Debug.Log("CaseX: " + CaseX);
	
	if( enter_ok && avancement>31 && avancement<=35)
	{
		Debug.Log("avancement: " + avancement);
		Debug.Log("CaseX: " + CaseX);
		CaseX = CaseConstructor("Caseb", avancement-31);
		transform.position = Vector3.MoveTowards(transform.position, GameObject.Find(CaseX.ToString()).transform.position,0.3f);
		transform.rotation = Quaternion.Slerp(transform.rotation, originalRotationValue, Time.time * rotationResetSpeed); 
		av_toc = false;
	}
	
	if(!av_toc && enter_ok && avancement == 36)
	{
	
		nbpointOut++;
		Debug.Log("nbpointOut: " + nbpointOut);
		transform.Translate(new Vector3(0, -0.5f ,0.5f ));
		
	}			
	
	if(av_toc && avancement>0 && avancement<=61)
	{
	Debug.Log("!enter_ok && avancement>0 && avancement<=61: " + avancement);
		transform.position = Vector3.MoveTowards(transform.position, GameObject.Find(CaseX.ToString()).transform.position,0.3f);
		// reset rotation   
        transform.rotation = Quaternion.Slerp(transform.rotation, originalRotationValue, Time.time * rotationResetSpeed); 
	}
		
}


function WaitForMoveSlow(waitTime)
{
    yield WaitForSeconds(waitTime);
}

 function WaitAndMove( waitTime) {
	
    yield WaitForSeconds(waitTime);
	movePion();	
	 avancement++;
	//Debug.Log(rigidbody.position);
	//print("avancement:"+avancement);
    //print("WaitAndPrint " + Time.time);
}
	
	
function testlog(_var) 
{
	Debug.Log("ca marche! "+_var);
	
}	