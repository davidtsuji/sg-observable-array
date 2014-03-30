# TOC
   - [sg-observable-array](#sg-observable-array)
<a name=""></a>
 
<a name="sg-observable-array"></a>
# sg-observable-array
Will allow you to hook in to the arrays methods to modify the array in any way you want.

```js
var tags = [ 1, 2, 3 ];
/**
 * Make the array `Observable`
 */
ObservableArray( tags );
/**
 * Say we want to ensure the array only contains numbers when values are pushed
 */
tags.on( 'push', function ( _value ) {
	/**
	 * The original array methods are accessible with the same name prefixed with '__'
	 */
	return tags.__push( parseInt( _value ) );
} );
tags.push( '4' );
tags.should.eql( [ 1, 2, 3, 4 ] );
```

They are still Arrays.

```js
var tags = [ 1, 2, 3 ];
/**
 * Make the array `Observable`
 */
ObservableArray( tags );
tags.should.be.an.Array;
```

If an Array method is not being _listened_ to, then the normal array behavior will apply.

```js
var tags = [ 1, 2, 3 ];
/**
 * Make the array `Observable`
 */
ObservableArray( tags );
/**
 * We have not defined an `on` method for 'pop' so Array.prototype.pop will apply
 */
tags.pop();
tags.should.eql( [ 1, 2 ] );
```

By defining a listener, it's possible to prevent the array from changing.

```js
var tags = [ 1, 2, 3 ];
/**
 * Make the array `Observable`
 */
ObservableArray( tags );
tags.on( 'unshift', function () {
	return 'chicken';
} );
tags.unshift().should.equal( 'chicken' );
tags.should.eql( [ 1, 2, 3 ] );
```

