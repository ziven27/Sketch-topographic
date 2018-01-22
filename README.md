# Sketch Topographic

Display Topographic Information.

## webdeveloper extention

![webdevelpoer](./img/webdeveloper.png)

Ideas form chrome extention [webdeveloper](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=zh-CN).

When you choose the `Display Topographic Information` you can see the struct of the page like below. That can check your page is align well like what you want.

![webdevelpoer-demo](./img/webdeveloper-demo.jpg)

It is a amazing function. So I try to make a Sketch vision like the wanderful extention. 

## What I did in this sketch plugin?

![sketch-demo](./img/sketch-demo.jpg)

Foreach layers and show the frame with a 'rgba(0,0,0,0.5)' shape. But I ingnore the `symbol` element.

## further more

* In our team, we highly recommend that each text should be a shared text style. If there is a text without shared text style the gray shape will turn out to be red('rgba(255,0,0,0.5)'). 
* When the text layer `Height%lightHeight!=0` the shape is red too. 

Of course you can Ingore all the rule when your element name with a `_` start.