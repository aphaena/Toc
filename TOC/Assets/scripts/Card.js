
import System.Xml;
 import System.Xml.Serialization;
 
 public class Card
 {
 	@XmlAttribute("name")
 	public var Name : String;
 
 	public var Health : int;
 }

