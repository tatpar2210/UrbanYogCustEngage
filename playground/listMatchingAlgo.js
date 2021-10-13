var o_list = [, "b", "c", "d", "e", "f"]
var d_list = ["a", "b", "c", "f"]

for (var i = 0; i < o_list.length; i++){
    for( var k = 0; k < d_list.length; k++){
        if (d_list[k] === o_list[i]){
            console.log("Found: ", o_list[i])
        }else{
        }
    }
}

console.log(d_list)