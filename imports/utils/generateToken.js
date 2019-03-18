import { Random } from "meteor/random";

export  function generatedToken(){
	return Random.id(40);
} 
