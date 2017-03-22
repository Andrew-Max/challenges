require 'test/unit'
extend Test::Unit::Assertions

class Flattener
	# Public interface does input validation and delegates to private method
	def flatten(input)
		raise ArgumentError, 'Argument is not array' unless input.is_a? Array
		recurse_flatten(input)
	end

	private
	# No outside dependencies or side effects for simplicity
	def recurse_flatten(arr)
		accumulator = []
			# output_array.concat(check_sub_array(el))
	  	if arr.kind_of?(Array)
			arr.each do |arr|
				accumulator.concat(recurse_flatten(arr))
			end
		else
			accumulator.concat([arr])
		end
		
		return accumulator
	end
end

flattener = Flattener.new

four_level_array = [1, [2,3, [4, [3, 9, 3]]]]

multi_type_array = [[1,2,[3, ['a' 'b', 'c'], false]],4, 'x', {name: "andrew", age: 28}]

# Check that flattener can handle at least four levels of nesting
assert_equal(flattener.flatten(four_level_array) , [1, 2, 3, 4 ,3, 9,3])
# Check that flattener can handle arrays of various classes
assert_equal(flattener.flatten(multi_type_array), [1, 2, 3, "ab", "c", false, 4, "x", {:name=>"andrew", :age=>28}])
# Check that flattener will not accept arguments for flatten other than arrays
assert_raise ArgumentError do
	flattener.flatten(3)
end