var ObservableArray = require( '../src' ),
	should = require( 'should' );

describe( 'Observable Array', function () {

	describe( 'original methods', function () {

		it( 'should still be an array', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.should.be.an.Array;
		} );

		it( 'should still be able to pop', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.pop().should.equal( 3 );
			tags.should.have.a.lengthOf( 2 );
		} );

		it( 'should still be able to push', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.push( 'end' ).should.equal( 4 );
			tags.should.have.a.lengthOf( 4 );
		} );

		it( 'should still be able to reverse', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.reverse();
			tags.should.eql( [ 3, 2, 1 ] );
		} );

		it( 'should still be able to shift', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.shift().should.eql( 1 );
			tags.should.have.a.lengthOf( 2 );
		} );

		it( 'should still be able to sort', function () {
			var tags = ObservableArray( [ 3, 1, 2 ] );

			tags.sort( function ( a, b ) {
				return a - b;
			} ).should.eql( [ 1, 2, 3 ] );

			tags.should.eql( [ 1, 2, 3 ] ).have.a.lengthOf( 3 );
		} );

		it( 'should still be able to splice', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.splice( 1, 1 ).should.eql( [ 2 ] );
			tags.should.have.a.lengthOf( 2 );
		} );

		it( 'should still be able to unshift', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.unshift( 'start' ).should.equal( 4 );
			tags.should.have.a.lengthOf( 4 );
		} );

	} );

	describe( 'overriding array methods without modifying the given array', function () {

		it( 'pop', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'pop', function ( _value ) {
				_value.should.equal( 3 );
				return 'popped';
			} );

			tags.pop().should.equal( 'popped' );
			tags.should.eql( [ 1, 2, 3 ] );
		} );

		it( 'push', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'push', function ( _value ) {
				_value.should.equal( 'end' );
				return 'pushed';
			} );

			tags.push( 'end' ).should.equal( 'pushed' );
			tags.should.eql( [ 1, 2, 3 ] );
		} );

		it( 'reverse', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'reverse', function ( _value ) {
				should( _value ).eql( undefined );
				return 'reversed';
			} );

			tags.reverse().should.equal( 'reversed' );
			tags.should.eql( [ 1, 2, 3 ] );
		} );

		it( 'shift', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'shift', function ( _value ) {
				should( _value ).eql( undefined );
				return 'shifted';
			} );

			tags.shift().should.equal( 'shifted' );
			tags.should.eql( [ 1, 2, 3 ] );
		} );

		it( 'sort', function () {
			var tags = ObservableArray( [ 3, 1, 2 ] );

			tags.on( 'sort', function ( _value ) {
				_value.should.be.a.Function;
				return 'sorted';
			} );

			tags.sort( function ( a, b ) {
				return a - b;
			} ).should.eql( 'sorted' );

			tags.should.eql( [ 3, 1, 2 ] ).and.have.a.lengthOf( 3 );
		} );

		it( 'splice', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'splice', function ( _index, _howMany, _el1, _el2 ) {
				_index.should.eql( 1 );
				_howMany.should.eql( 2 );
				_el1.should.eql( 'wat' );
				_el2.should.eql( 'batman' );
				return 'spliced';
			} );

			tags.splice( 1, 2, 'wat', 'batman' ).should.eql( 'spliced' );

			tags.should.eql( [ 1, 2, 3 ] ).and.have.a.lengthOf( 3 );
		} );

	} )

	describe( 'overriding array methods and _modify_ the given array', function () {

		it( 'pop', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'pop', function ( _value ) {
				return tags.__pop();
			} );

			tags.pop().should.equal( 3 );
			tags.should.eql( [ 1, 2 ] );
		} );

		it( 'push', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'push', function ( _value ) {
				return tags.__push( _value );
			} );

			tags.push( 'end' ).should.equal( 4 );
			tags.should.eql( [ 1, 2, 3, 'end' ] );
		} );

		it( 'reverse', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'reverse', function () {
				return tags.__reverse();
			} );

			tags.reverse().should.eql( [ 3, 2, 1 ] );
			tags.should.eql( [ 3, 2, 1 ] );
		} );

		it( 'shift', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'shift', function ( _value ) {
				return tags.__shift();
			} );

			tags.shift().should.equal( 1 );
			tags.should.eql( [ 2, 3 ] );
		} );

		it( 'sort', function () {
			var tags = ObservableArray( [ 3, 1, 2 ] );

			tags.on( 'sort', function ( _value ) {
				return tags.__sort.apply( tags, arguments );
			} );

			tags.sort( function ( a, b ) {
				return a - b;
			} ).should.eql( [ 1, 2, 3 ] );

			tags.should.eql( [ 1, 2, 3 ] ).and.have.a.lengthOf( 3 );
		} );

		it( 'splice', function () {
			var tags = ObservableArray( [ 1, 2, 3 ] );

			tags.on( 'splice', function () {
				return tags.__splice.apply( tags, arguments );
			} );

			tags.splice( 1, 2, 'wat', 'batman' ).should.eql( [ 2, 3 ] );
			tags.should.eql( [ 1, 'wat', 'batman' ] ).and.have.a.lengthOf( 3 );
		} );

	} )

} );