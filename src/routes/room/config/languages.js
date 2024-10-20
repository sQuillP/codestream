
export default Object.freeze({
    "python": {
        fontSize:'16px',
        language:'python',
        path:'program.py',
        defaultValue: `

#Basic Python boilerplate code. 
if __name__ == '__main__':
    print("Hello Python3!")
`
    },
    "c++": {
        language:'cpp',
        fontSize:'16px',
        path:'program.cpp',
        defaultValue:`
#include <iostream>
using namespace std;
        
int main(){
    //Your code here
    cout<<"Hello from C++"<<endl;
    return 0;
}`
    },
    "c#":{
        language:'csharp',
        fontSize:'16px',
        path:'program.cs',
        defaultValue:`
using System;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine ("Hello from C#!");
    }
}`
    },
    "java": {
        language:'java', 
        fontSize:'16px',
        path:'program.java',
        defaultValue:`
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java");
    }
}`
    },
    "go":{
        language:'go',
        fontSize:'16px',
        path:'program.go',
        defaultValue:`
package main
import "fmt"
func main() {
    fmt.Println("Hello from GO!")
}`
    },
    "javascript": {
        language:'javascript',
        fontSize:'16px',
        path:'program.js',
        defaultValue:`
//some JavaScript Boilerplate to get started
console.log("Hello JavaScript!");`
    },
    "c": {
        language:'c',
        fontSize:'16px',
        path:'program.c',
        defaultValue:`
#include <stdio.h>

int main(){
    //Your code here
    printf("Hello C!");
    return 0;
}`
    }
})