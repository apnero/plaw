set :public_dir, Proc.new { File.join(root, "_site") }
set :views, Proc.new { File.join(File.dirname(__FILE__), "views") }


post '/send_email' do  
	

	# -*- encoding: utf-8 -*-
	require 'sendgrid_ruby'
	require 'sendgrid_ruby/version'
	require 'sendgrid_ruby/email'
	require 'sendgrid-ruby'
	require 'json'

	sendgrid_username = 'app30181830@heroku.com'	#ENV["SENDGRID_USERNAME"]
	sendgrid_password = 'malamute'	#ENV["SENDGRID_PASSWORD"]
	
	email = SendgridRuby::Email.new
	email.add_to('andrew.nero@gmail.com')
	.set_from('andrew@plasmascape.com')
	.set_subject(params[:email_subject])
	.set_text("<h3>Name: #{params[:email_name]}</h3><h3>Email: #{params[:email_address]}</h3><h3>Phone: #{params[:phone_number]}</h3><p>Message: #{params[:email_message]}</h3>")
	.set_html("<h3>Name: #{params[:email_name]}</h3><h3>Email: #{params[:email_address]}</h3><h3>Phone: #{params[:phone_number]}</h3><h3>Message: </h3><p>#{params[:email_message]}</p>")

	  
	sendgrid = SendgridRuby::Sendgrid.new(sendgrid_username, sendgrid_password)
	sendgrid.debug_output = true # remove comment if you need to see the request
	response = sendgrid.send(email)
	puts response.to_json
	


end


before do  
    response.headers['Cache-Control'] = 'public, max-age=36000'
end

not_found do  
    File.read('404.html')
end


get '/*' do  
    file_name = "_site#{request.path_info}/index.html".gsub(%r{\/+},'/')
    if File.exists?(file_name)
    File.read(file_name)
    else
    raise Sinatra::NotFound
    end
end