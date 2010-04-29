require 'nokogiri'
f = File.open('organisation-verfuegbarkeit.html')
doc = Nokogiri::HTML(f)
heading_tree = []
last_h2 = nil
doc.css('h2, h3').each do |heading|
	if heading.name == 'h2'
		last_h2 = { 'heading' => heading.content, 'id' => heading.parent['id'], 'subheadings' => [] }
		heading_tree.push(last_h2)
	elsif last_h2
		last_h2['subheadings'].push 'heading' => heading.content, 'id' => heading.parent['id']
	end
end
puts heading_tree.inspect