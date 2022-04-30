var canvas;
var gl;
var points = [];
var colors = [];
var mvLoc;
var translation;
var translationArray=[0,0,0,0];
var rotationArray=[0,0,0];
var scaleArray=[1,1]

//TODO: Define global variables if needed

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    var vertices = [
        vec4(  0.0000,  0.0000, -1.0000, 1 ),
        vec4(  0.0000,  0.9428,  0.3333, 1 ),
        vec4( -0.8165, -0.4714,  0.3333, 1 ),
        vec4(  0.8165, -0.4714,  0.3333, 1 )
    ];
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );    

    //TODO: generate tetrahedron geometry and send vertices and colors to GPU
    tetra(vertices[0], vertices[1], vertices[2], vertices[3])
    mvLoc = gl.getUniformLocation(program, "modelviewmatrix"); 
    translation = gl.getUniformLocation(program, "translation"); 
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   
   
    // sliders for viewing parameters


	document.getElementById("rotX").oninput = function(event) {
        //TODO:handle input here
        rotationArray[0] = this.value;
        requestAnimFrame(render)
    };
	
    document.getElementById("rotY").oninput = function(event) {
        //TODO:handle input here
        rotationArray[1] = this.value;
        requestAnimFrame(render)
    };

    document.getElementById("objRotationZSlider").oninput = function(event) {
        //TODO:handle input here
        rotationArray[2] = this.value;
        requestAnimFrame(render)
    };
   
    document.getElementById("posX").oninput = function(event) {
        //TODO:handle input here
        translationArray[0] = this.value;
        requestAnimFrame(render);
    };
	
    document.getElementById("posY").oninput = function(event) {
        //TODO:handle input here
        translationArray[1] = this.value;
        requestAnimFrame(render);
    };
	
	document.getElementById("scaleX").oninput = function(event) {
        //TODO:handle input here
        scaleArray[0] = this.value;
        requestAnimFrame(render);
    };
	
    document.getElementById("scaleY").oninput = function(event) {
        //TODO:handle input here
        scaleArray[1] = this.value;
        requestAnimFrame(render);
    };
	   
	document.getElementById("ResetButton").addEventListener("click", function(){
		//TODO:handle input here,
        translationArray=[0,0,0,0];
        rotationArray=[0,0,0];
        scaleArray=[1,1]
        requestAnimFrame(render);
    });	
   
    render();
}

//TODO:modify this function to render the shape and apply transformations
var render = function(){
    var modelviewmatrix = mat4();
	
    modelviewmatrix = mult(modelviewmatrix,rotate(rotationArray[2],0,0,1))
    modelviewmatrix = mult(modelviewmatrix,rotate(rotationArray[1],0,1,0))
    modelviewmatrix = mult(modelviewmatrix,rotate(rotationArray[0],1,0,0))

    modelviewmatrix = mult(modelviewmatrix,scalem(scaleArray[0],scaleArray[1],0))

    gl.uniform4fv(translation,translationArray)
    gl.uniformMatrix4fv( mvLoc, false, flatten(modelviewmatrix) );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    //requestAnimFrame(render);
}


function triangle( a, b, c, color )
{

    // add colors and vertices for one triangle

    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
}

function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}
