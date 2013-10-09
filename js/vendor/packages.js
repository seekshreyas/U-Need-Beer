(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      console.log("classes", classes);
      var userBeerType= $('#beerType').val();
      console.log("userBeerType in packages.js",userBeerType);
      var filteredClasses = [];
      var beerStyles = [];
      var beerStylesColors = [];


      // for (var i=0; i< classes.length; i++){

      
      //   if (BEERVIZ.userBeerType == 0){
      //     //light beer
      //     if (classes[i].color < 10)
      //     {
      //       filteredClasses.push(classes[i]);
      //     }
      //   }if(BEERVIZ.userBeerType == 1){
      //     //medium beer
      //     if (classes[i].color > 10 && classes[i].color <=20)
      //     {
      //       filteredClasses.push(classes[i]);
      //     }
      //   }if(BEERVIZ.userBeerType == 2){
      //     //dark beer
      //     if (classes[i].color > 20 && classes[i].color <=40)
      //     {
      //       filteredClasses.push(classes[i]);
      //     }
      //   }
        
      // }

       for (var i=0; i< classes.length; i++){

        if (userBeerType == 0){
          //light beer

          if (classes[i].color > 6 && classes[i].color <=10)

          {
            filteredClasses.push(classes[i]);

            var newStyle = classes[i].style;

            if(beerStyles.indexOf(newStyle) === -1){
               beerStyles.push(newStyle);
               beerStylesColors.push(classes[i].style_color);
            }

           
          }
        }

        if(userBeerType == 1){
          //medium beer
          if (classes[i].color > 13 && classes[i].color <=15)
          {
            filteredClasses.push(classes[i]);

            var newStyle = classes[i].style;

             if(beerStyles.indexOf(newStyle) === -1){
               beerStyles.push(newStyle);
               beerStylesColors.push(classes[i].style_color);
            }
          }
        }

        if(userBeerType == 2){
          //dark beer
          if (classes[i].color > 38 && classes[i].color <=40)

          {
            filteredClasses.push(classes[i]);

            var newStyle = classes[i].style;

             if(beerStyles.indexOf(newStyle) === -1){
               beerStyles.push(newStyle);
               beerStylesColors.push(classes[i].style_color);
            }
          }
        }
        
      }

     

      BEERVIZ.renderBeerStyles(beerStyles, beerStylesColors);

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};

          // console.log("node:", node);


          if (name.length) {
             i = name.lastIndexOf(".");
            // console.log("i:", i);
          
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            // console.log("node parent:", node.parent);
            // node.parent = ["shreyas"]
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
            
          }
        }
        return node;
      }

      filteredClasses.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.related) d.related.forEach(function(i) {
          imports.push({source: map[d.name], target: map[i]});
        });
      });

      return imports;
    }

  };
})();
