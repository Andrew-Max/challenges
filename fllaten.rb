require "pry"

sample = [[1,2,[3, ['a', 'b', 'c']]],4, 'x', {name: "andrew", age: 28}]
$ar = []

def flatten(input_ar)
	raise ArgumentError, 'Argument is not array' unless  input_ar.is_a? Array 

	input_ar.each do |el|
  		check_sub_array(el)
	end
	
	return $ar
end

def check_sub_array(el)
	if el.kind_of?(Array)
		el.each do |sub|
			check_sub_array(sub)
		end
	else
		$ar.push el
	end
end


