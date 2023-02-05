class Materials{
    constructor(spriteGroup, noOfSprites, spriteImg, scale){
        
        this.x= Math.round(random(width/2-250, width/2+300));
        this.y= Math.round(random(height-500, -height*5));
        this.noOfSprites= noOfSprites;
        this.spriteImg= spriteImg;
        this.spriteGroup= spriteGroup;
        this.scale= scale;
    }

    spawnMaterials(){
        for (let i = 0; i < this.noOfSprites; i++) {
            var material= createSprite(this.x, this.y);
            material.addImage(this.spriteImg);
            material.scale= this.scale;
            this.spriteGroup.add(material);
        }

    }
}