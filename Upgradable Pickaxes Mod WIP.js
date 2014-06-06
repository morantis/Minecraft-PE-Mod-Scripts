var AutoSmeltUpgradeId = 410
var PulveriseUpgradeId = 411 
var ironDustId = 400
var goldDustId = 401 

ModPE.setItem(AutoSmeltUpgradeId,"apple",0,"Auto-Smelt Upgrade")
ModPE.setItem(PulveriseUpgradeId,"apple",0,"Pulveriser Upgrade")
ModPE.setItem(ironDustId,"apple",0,"Iron Dust")
ModPE.setItem(goldDustId,"apple",0,"Gold Dust")
Item.addFurnaceRecipe(265,0,ironDustId)
Item.addFurnaceRecipe(266,0,goldDustId)




function destroyBlock(x,y,z,shouldDropItem){
	ci = getCarriedItem()
	if(ci == 257 || ci == 270 || ci == 274 || ci == 278 || ci == 285){
		gt = getTile(x,y,z)
		if(Player.checkForInventoryItem(AutoSmeltUpgradeId) >= 1){ //autosmelt and changes if also pulverise (gold and iron)
			//clientMessage("3")
			if(gt == 15 && ci != 270){
				preventDefault()
				setTile(x,y,z,0,0)
				Level.dropItem(x,y,z,0.25,265,Player.checkForInventoryItem(PulveriseUpgradeId)+1,0)
			}
			if(gt == 14 && ci != 270 && ci != 274){
				preventDefault()
				setTile(x,y,z,0,0)
				Level.dropItem(x,y,z,0.25,266,Player.checkForInventoryItem(PulveriseUpgradeId)+1,0)
			}
		}
		
		if(Player.checkForInventoryItem(PulveriseUpgradeId) == 1 && Player.checkForInventoryItem(AutoSmeltUpgradeId) == 0){ //Pulverise and no autosmelt (gold and iron)
			if(gt == 15 && ci != 270){
				preventDefault()
				setTile(x,y,z,0)
				Level.dropItem(x,y,z,0.25,ironDustId,2,0)
			}
			if(gt == 14 && ci != 270 && ci != 274){
				preventDefault()
				setTile(x,y,z,0)
				Level.dropItem(x,y,z,0.25,goldDustId,2,0)
			}	
		}
		
		if(Player.checkForInventoryItem(PulveriseUpgradeId) == 1){ //Pulveriser upgrade and optinally autosmelt (lapis and redstone)
			if(gt == 73 || gt == 74){
				if(ci != 270 && ci != 274){
				preventDefault()
				setTile(x,y,z,0,0)
				Level.dropItem(x,y,z,0.25,331,8,0)
				}
			}
			if(gt == 21 && ci != 270){
				preventDefault()
				setTile(x,y,z,0)
				Level.dropItem(x,y,z,0.25,351,8,4)
			}
		}
	}
}

	


Player.checkForInventoryItem = function(id, amount, damage) {
	if(!amount) amount = 1;
	if(!damage) damage = 0;
	if(!id) id = 0;
	var count = 0;
	for(var i = 0; i < 255; i++) if(Player.getInventorySlot(i) == id && Player.getInventorySlotData(i) == damage) count += Player.getInventorySlotCount(i);
	return count >= amount;
};
