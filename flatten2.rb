# require "pry"

sample = [[1,2,[3, ['a', 'b', 'c']]],4, 'x', {name: "andrew", age: 28}]

simple_sample = [1, [2,3,4]]
# def flatten(input_ar)
# 	raise ArgumentError, 'Argument is not array' unless  input_ar.is_a? Array 
# 	output_array = []

# 	input_ar.each do |el|
# 		puts "looping main"
#   		puts(output_array.inspect)
#   		output_array.concat(check_sub_array(el))
#   		puts "looped main"
#   		puts(output_array.inspect)
# 	end
	
# 	return output_array
# end

def check_sub_array(array)
	array.select  do |x|
		x.kind_of? Array 
	end
end