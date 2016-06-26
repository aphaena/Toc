#pragma strict
 
import System;
import System.Collections;
import System.Collections.Generic;
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;
import System.Linq;

enum GameState
{
	Start,
	Game,
	Pause,
	End,
	Switch,
}

public var camP1 = true;
public var camP2 = false;
//private var xCameraP1 : GameObject ;
//private var xCameraP2 : GameObject ;

// init pour la lecture du fichier XML   
public var _id = new Array();
public var _deplacement = new Array();
public var _ref = new Array();
public var  _image = new Array();
public var  _out_ok = new Array();
public var  _enter_ok = new Array();
public var  _echange = new Array();
public var  _capture = new Array();
public var  _play_again = new Array();
public var  _decompose = new Array();
public var  _move_adversaire = new Array();
public var  _pass_start = new Array();

public var  _cards = new Array();
public var  _tirage = new Array();
public var  _pot = new Array();
public var 	_currentCard ; // carte qui joue
public var  _player1Cards = new Array(); // array qui contient les cartes du joeur
public var  _player2Cards = new Array();
public var  _player3Cards = new Array();
public var  _player4Cards = new Array();

public var _movepion;

private var state : GameState = GameState.Start;
private var _FileLocation : String = "Assets";
private var _FileName : String = "cards6.xml";
 
private var _data : String;
 
// init variable for objects
private var p1Bleu : GameObject;
private var p1Rouge : GameObject;
private var p1Jaune : GameObject;
private var p1Vert : GameObject;

private var p2Bleu : GameObject;
private var p2Rouge : GameObject;
private var p2Jaune : GameObject;
private var p2Vert : GameObject;

private var p3Bleu : GameObject;
private var p3Rouge : GameObject;
private var p3Jaune : GameObject;
private var p3Vert : GameObject;

private var tas_1 : GameObject;
private var tas_2 : GameObject;
private var hit_obj : GameObject;


function Start () {	
	// init variable objects with their Tags in modeler	
	LoadXML();

	//xCameraP1 = GameObject.FindWithTag("CameraP1");
	//xCameraP2 = GameObject.FindWithTag("CameraP2");

	p1Bleu = GameObject.FindWithTag("BleuP1");
	p1Rouge = GameObject.FindWithTag("RougeP1");
	p1Jaune = GameObject.FindWithTag("JauneP1");
	p1Vert = GameObject.FindWithTag("VertP1");
	
	p2Bleu = GameObject.FindWithTag("BleuP2");
	p2Rouge = GameObject.FindWithTag("RougeP2");
	p2Jaune = GameObject.FindWithTag("JauneP2");
	p2Vert = GameObject.FindWithTag("VertP2");

	p3Bleu = GameObject.FindWithTag("BleuP3");
	p3Rouge = GameObject.FindWithTag("RougeP3");
	p3Jaune = GameObject.FindWithTag("JauneP3");
	p3Vert = GameObject.FindWithTag("VertP3");
		
	tas_1 = GameObject.FindWithTag("Tas_1");
	tas_2 = GameObject.FindWithTag("Tas_2");
	

	
	this.p2Vert.transform.Translate(new Vector3(0.118f ,0,0.1f  ));	
	 var tmp = _ref[0].ToString();   
	 Debug.Log("_ref[0]: "+_ref[0]);
	 
	this.tas_2.renderer.material.mainTexture = UnityEngine.Resources.Load(_ref[0], Texture2D);
	cards_melanger();
	cards_distribution();
}

function OnClickPion()
{
	//Debug.Log("OnClickPiont()");
	
}

function cards_distribution() 
{
		
		// stocke les cartes dns le tableau du jouer
		_player1Cards[0] = _tirage[0];
		_player1Cards[1] = _tirage[1];
		_player1Cards[2] = _tirage[2];
		_player1Cards[3] = _tirage[3];
		_player1Cards[4] = _tirage[4];
		
				//change les textures des chaques du joueur1
		card_change_image( "P1_CarPlay_1",  _player1Cards[0]);
		card_change_image( "P1_CarPlay_2",  _player1Cards[1]);
		card_change_image( "P1_CarPlay_3",  _player1Cards[2]);
		card_change_image( "P1_CarPlay_4",  _player1Cards[3]);
		card_change_image( "P1_CarPlay_5",  _player1Cards[4]);
		
		
		// retire 5 carte du paquet tas1 tirage
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		
		// P2 stocke les cartes dns le tableau du jouer
		_player2Cards[0] = _tirage[0];
		_player2Cards[1] = _tirage[1];
		_player2Cards[2] = _tirage[2];
		_player2Cards[3] = _tirage[3];
		_player2Cards[4] = _tirage[4];
		
		//change les textures des chaques du joueur1
		card_change_image( "P2_CarPlay_1",  _player2Cards[0]);
		card_change_image( "P2_CarPlay_2",  _player2Cards[1]);
		card_change_image( "P2_CarPlay_3",  _player2Cards[2]);
		card_change_image( "P2_CarPlay_4",  _player2Cards[3]);
		card_change_image( "P2_CarPlay_5",  _player2Cards[4]);
		
		
		// retire 5 carte du paquet tas1 tirage
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);		

		// P3 stocke les cartes dns le tableau du jouer
		_player3Cards[0] = _tirage[0];
		_player3Cards[1] = _tirage[1];
		_player3Cards[2] = _tirage[2];
		_player3Cards[3] = _tirage[3];
		_player3Cards[4] = _tirage[4];
		
				//change les textures des chaques du joueur1
		card_change_image( "P3_CarPlay_1",  _player3Cards[0]);
		card_change_image( "P3_CarPlay_2",  _player3Cards[1]);
		card_change_image( "P3_CarPlay_3",  _player3Cards[2]);
		card_change_image( "P3_CarPlay_4",  _player3Cards[3]);
		card_change_image( "P3_CarPlay_5",  _player3Cards[4]);
		
		
		// retire 5 carte du paquet tas1 tirage
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);				

		// P4 stocke les cartes dns le tableau du jouer
		_player4Cards[0] = _tirage[0];
		_player4Cards[1] = _tirage[1];
		_player4Cards[2] = _tirage[2];
		_player4Cards[3] = _tirage[3];
		_player4Cards[4] = _tirage[4];
		
				//change les textures des chaques du joueur1
		card_change_image( "P4_CarPlay_1",  _player4Cards[0]);
		card_change_image( "P4_CarPlay_2",  _player4Cards[1]);
		card_change_image( "P4_CarPlay_3",  _player4Cards[2]);
		card_change_image( "P4_CarPlay_4",  _player4Cards[3]);
		card_change_image( "P4_CarPlay_5",  _player4Cards[4]);
		
		
		// retire 5 carte du paquet tas1 tirage
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);
		_tirage.RemoveAt(0);			
	
}   

function card_change_image( cardtag,  ladonne)
{
	var card_mesh = GameObject.FindWithTag(cardtag);
	card_mesh.renderer.material.mainTexture = UnityEngine.Resources.Load(_ref[Int32.Parse(ladonne)].ToString(), Texture2D); 
	Debug.Log("cardtag: " + cardtag + " ladoone: "+ladonne);
}

function cards_melanger()
{	
	Debug.Log("_tirage.length: " + _tirage.length);
	for (var t = 0; t < _tirage.length; t++ )
        {
            var tmp = _tirage[t];
            var r = UnityEngine.Random.Range(t, _tirage.length-1);
            _tirage[t] = _tirage[r];
            _tirage[r] = tmp;
          
        }
}
// contient les actions
function Update () {
	
	if(Input.GetMouseButtonDown(0))
	{
	 	
	 		//Debug.Log("Pressed left clicked.");
			 var hit : RaycastHit;
			 var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			  if (Physics.Raycast(ray, hit))
        		{
        	   	 //print out the name if the raycast hits something
        	    	//Debug.Log("collider clicker tt: "+ hit.collider.name);
        	    	//Debug.Log("hit.collider.tag " + hit.collider.tag);
        	    	 hit_obj = GameObject.FindWithTag(hit.collider.tag);
        	    	       	    	
        	    	switch(hit.collider.tag)
					{
						case "P1_CarPlay_1":	
						
							 animationCardsPlayer1(0, "P1_CarPlay_1", "P1_card1", "P1_card1r");	
											/*
							_movepion = _deplacement[Int32.Parse(_player1Cards[0].ToString())];		
							hit_obj.animation.Play("P1_card1");	
							//yield hit_obj.animation.PlayQueued("P1_card1");	
							//while(hit_obj.animation.IsPlaying("P1_card1")){}
										
								card_change_image( "Tas_2",  _player1Cards[0]);
								_player1Cards[0] = _tirage[0];
								_tirage.RemoveAt(0);
								card_change_image( "P1_CarPlay_1",  _player1Cards[0]);
								//hit_obj.animation.isPlaying
								//if (!animation.IsPlaying("YourAnimation")) hit_obj.animation.Play("P1_card1r");	
								
								Debug.Log("P1_CarPlay_1 "+_ref[Int32.Parse(_player1Cards[0].ToString())]+"movepiont: "+_movepion);
							*/
						break;
						
						case "P1_CarPlay_2":
							 animationCardsPlayer1(1, "P1_CarPlay_2", "P1_card2", "P1_card2r");								
						break;
						
						case "P1_CarPlay_3":
							animationCardsPlayer1(2, "P1_CarPlay_3", "P1_card3", "P1_card3r");	
						break;
						
						case "P1_CarPlay_4":
							animationCardsPlayer1(3, "P1_CarPlay_4", "P1_card4", "P1_card4r");	
						break;
						
						case "P1_CarPlay_5":			
							animationCardsPlayer1(4, "P1_CarPlay_5", "P1_card5", "P1_card5r");	
						break;
						
						// P2 ///////////////////////////////////////
						case "P2_CarPlay_1":
						/*
							Debug.Log("P1_CarPlay_1 _ref "+_ref[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _out_ok "+_out_ok[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _enter_ok "+_enter_ok[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _echange "+_echange[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _play_again "+_play_again[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _decompose "+_decompose[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _move_adversaire "+_move_adversaire[Int32.Parse(_player2Cards[0].ToString())]);
							Debug.Log("P1_CarPlay_1 _pass_start "+_pass_start[Int32.Parse(_player2Cards[0].ToString())]);
						*/			
							
						case "P2_CarPlay_2":							
							Debug.Log("CarPlay_2 "+_ref[Int32.Parse(_player2Cards[1].ToString())]);
						break;
						
						case "P2_CarPlay_3":
						
							Debug.Log("CarPlay_3 "+_ref[Int32.Parse(_player2Cards[2].ToString())]);
						break;
						
						case "P2_CarPlay_4":
			
							Debug.Log("CarPlay_4 "+_ref[Int32.Parse(_player2Cards[3].ToString())]);
						break;
						
						case "P2_CarPlay_5":
			
							Debug.Log("CarPlay_5 "+_ref[Int32.Parse(_player2Cards[4].ToString())]);
						break;	
						
						// P3 ///////////////////////////////////////
						case "P3_CarPlay_1":
							Debug.Log("P3_CarPlay_1 "+_ref[Int32.Parse(_player3Cards[0].ToString())]);
						break;
						
						case "P3_CarPlay_2":							
							Debug.Log("P3_CarPlay_2 "+_ref[Int32.Parse(_player3Cards[1].ToString())]);
						break;
						
						case "P3_CarPlay_3":
						
							Debug.Log("P3_CarPlay_3 "+_ref[Int32.Parse(_player3Cards[2].ToString())]);
						break;
						
						case "P3_CarPlay_4":
			
							Debug.Log("P3_CarPlay_4 "+_ref[Int32.Parse(_player3Cards[3])].ToString());
						break;
						
						case "P3_CarPlay_5":
			
							Debug.Log("P3_CarPlay_5 "+_ref[Int32.Parse(_player3Cards[4].ToString())]);
						break;	
						
					// P3 ///////////////////////////////////////
						case "P4_CarPlay_1":
							Debug.Log("P4_CarPlay_1 "+_ref[Int32.Parse(_player4Cards[0].ToString())]);
						break;
						
						case "P4_CarPlay_2":							
							Debug.Log("P4_CarPlay_2 "+_ref[Int32.Parse(_player4Cards[1].ToString())]);
						break;
						
						case "P4_CarPlay_3":						
							Debug.Log("P4_CarPlay_3 "+_ref[Int32.Parse(_player4Cards[2].ToString())]);
						break;
						
						case "P4_CarPlay_4":			
							Debug.Log("P4_CarPlay_4 "+_ref[Int32.Parse(_player4Cards[3].ToString())]);
						break;
						
						case "P4_CarPlay_5":			
							Debug.Log("P4_CarPlay_5 "+_ref[Int32.Parse(_player4Cards[4].ToString())]);
						break;							
						
						
						case "BleuP1":			
								
						Debug.Log("P1_CarPlay_1 _ref "+_ref[_currentCard]);
						Debug.Log("P1_CarPlay_1 _deplacement "+_deplacement[_currentCard]);
						Debug.Log("P1_CarPlay_1 _out_ok "+_out_ok[_currentCard]);
						Debug.Log("P1_CarPlay_1 _enter_ok "+_enter_ok[_currentCard]);
						Debug.Log("P1_CarPlay_1 _echange "+_echange[_currentCard]);
						Debug.Log("P1_CarPlay_1 _play_again "+_play_again[_currentCard]);
						Debug.Log("P1_CarPlay_1 _decompose "+_decompose[_currentCard]);
						Debug.Log("P1_CarPlay_1 _move_adversaire "+_move_adversaire[_currentCard]);
						Debug.Log("P1_CarPlay_1 _pass_start "+_pass_start[_currentCard]);		
								
							Debug.Log("le point bleu 1");
							var scriptB1 = GameObject.Find ("BleuP1").GetComponent(PBleu);
							Debug.Log("BleuP1 MoveInOutPiont");
							
							scriptB1.MoveInOutPiont(_movepion, 1);																		
						break;
						case "BleuP2":						
							Debug.Log("le point bleu 2");
							var scriptB2 = GameObject.Find ("BleuP2").GetComponent(PBleu);
							Debug.Log("BleuP2 MoveInOutPiont");
							scriptB2.MoveInOutPiont(_movepion, 2);																		
						break;
						case "BleuP3":						
							Debug.Log("le point bleu 3");
							var scriptB3 = GameObject.Find ("BleuP3").GetComponent(PBleu);
							Debug.Log("BleuP3 MoveInOutPiont");
							scriptB3.MoveInOutPiont(_movepion, 3);																		
						break;																					
					}
					
        	    	//var _index = Int32.Parse(_tirage[1]);
        	    	//hit_obj.renderer.material.mainTexture = UnityEngine.Resources.Load(_ref[_index].ToString(), Texture2D);     
        	    	//Debug.Log("hit.collider.tag" + hit.collider.tag);   	    	
       			}
	}
				
	if(Input.GetMouseButtonDown(1))
	{
		Debug.Log("Pressed right click.");
		
		
	}
	if(Input.GetMouseButtonDown(2))
	{
		Debug.Log("Pressed middle click.");
		if(camP1) 
		{
			//xCameraP1.gameObject.active = false ; 
			camP1 = false;
		 	//xCameraP2.gameObject.active = true ; 
		 	camP2 = true;
		}
		if(camP2) 
		{
			//xCameraP1.gameObject.active = true ; 
			camP1 = true;
		 	//xCameraP2.gameObject.active = false ; 
		 	camP2 = false;
		}
	}
		
			
			
	switch(state)
	{
		case GameState.Start:
		break;
		
		case GameState.Game:
		break;
		
		case GameState.Pause:
		break;
		
		case GameState.End:
		break;
		
		case GameState.Switch:
		break;
	}
}



function animationCardsPlayer1( carteNumber, tagCarPlay,  animation1, animation2 )
{
				
		//hit_obj.animation.PlayQueued(animation1.ToString());	
		//yield WaitForAnimation();					

		Debug.Log("animationCardsPlayer1: "+carteNumber+" "+tagCarPlay+" "+animation1+" "+animation2);
		card_change_image( "Tas_2",  _player1Cards[carteNumber]);
		_movepion = _deplacement[Int32.Parse(_player1Cards[carteNumber].ToString())];	
		Debug.Log(tagCarPlay+" "+_ref[Int32.Parse(_player1Cards[carteNumber].ToString())]+" movepiont: "+_movepion);	// décalage de tableau
		_pot.Add(_player1Cards[carteNumber]); // ajoute la carte jouée dans le pot
		_currentCard = Int32.Parse(_player1Cards[carteNumber].ToString());
		Debug.Log("animationCardsPlayer1: _currentCard: "+ _currentCard.ToString());
		
		_tirage.RemoveAt(0); // retire la carte de de la pioche
		
		Debug.Log("_tirage: "+ _tirage.length+ " _player1Cards[]: "+_player1Cards[carteNumber]+" _tirage "+_tirage[0]);
		
		// change l'image de la carte
		_player1Cards[carteNumber] = _tirage[0]; // carte tirée pr le joueur en haut de la pile
		card_change_image( tagCarPlay ,  _player1Cards[carteNumber]);			

		
		//hit_obj.animation.PlayQueued(animation2.ToString());	
		//yield WaitForAnimation();	
		
}

function WaitForAnimation ()
{
	Debug.Log("WaitForAnimation ");
    yield; while ( hit_obj.animation.isPlaying ) yield;
}


function OnMouseDown()
{
   Debug.Log("The OnMouseDown was clicked");
}

//execute les actions
function StateChange(newState :  GameState)
{
	state = newState;
	switch(state)
	{
		case GameState.Start:
		Debug.Log("GameState.Start: ");
		break;
		
		case GameState.Game:
		Debug.Log("GameState.Game: ");
		break;
		
		case GameState.Pause:
		Debug.Log("GameState.Pause: ");
		break;
		
		case GameState.End:
		Debug.Log("GameState.End: ");
		break;
		
		case GameState.Switch:
		Debug.Log("GameState.Switch: ");
		break;
	}
} 

 
function LoadXML()
{
   //StreamReader r = File.OpenText(_FileLocation+"\\"+ _FileName);
   var r : StreamReader = File.OpenText(_FileLocation+"/"+ _FileName);
   var _info : String = r.ReadToEnd();
   r.Close();
   _data=_info;
   //Debug.Log("File Read"+_data);
   
   var doc = new XmlDocument();
    doc.LoadXml(_data);
 
    var lookup = doc.DocumentElement
   .ChildNodes.OfType.<XmlNode>()
    .SelectMany(
        function(c) { 
        return c.ChildNodes.OfType.<XmlNode>(); 
        }
    ).GroupBy(function(n) {
        return n.Name;
   }).Select(function(g) {
        return { "tag": g.Key,
        "values": g.Select(function(n){ return n.InnerText;}).ToArray() };
    }).ToDictionary(function(h) { return h["tag"];} );

    _id = lookup["id"]["values"];
    _deplacement = lookup["deplacement"]["values"];
    _ref = lookup["ref"]["values"];
    _image = lookup["image"]["values"];
    _out_ok = lookup["out_ok"]["values"];
    _enter_ok = lookup["enter_ok"]["values"];
    _echange = lookup["echange"]["values"];
    _capture = lookup["capture"]["values"];
    _play_again = lookup["play_again"]["values"];
    _decompose = lookup["decompose"]["values"];
    _move_adversaire = lookup["move_adversaire"]["values"];
    _pass_start = lookup["pass_start"]["values"];
    
    _tirage = _id;

	//Debug.Log("id: "+_id[0]);   
  	//Debug.Log("deplacement: "+_deplacement[0]);
  	//Debug.Log("ref: "+_ref[0]);   
  	 
  	 /*
  	 for (var value : String in deplacement) {
		print(value);
	}
	*/
  	//print(deplacement.Length);
}
