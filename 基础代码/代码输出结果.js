///////////////////////
function say() {
    console.log(name);
    console.log(age);
    var name = 'zj';
    let age = 30;
}
say();

/////////////////////
let obj1 = {
    name: 'obj1_name',
    print: function() {
        return () => console.log(this.name)
    }
};
let obj2 = {
    name: 'obj2_name',
};
obj1.print()();
obj1.print().call(obj2);
obj1.print.call(obj2)();

/////////////////////
[1, 2, 3, 4].reduce((a, b) => { console.log(a, b) })

/////////////////////
const myLife = ['sleep', 'eating', 'dancing', 'play'];
for(const i in myLife) {
    console.log(i);
}
for(const i of myLife) {
    console.log(i);
}