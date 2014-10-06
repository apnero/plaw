set :public_dir, Proc.new { File.join(root, "_site") }
set :views, Proc.new { File.join(File.dirname(__FILE__), "views") }


post '/send_email' do  
	

	# -*- encoding: utf-8 -*-
	require 'sendgrid_ruby'
	require 'sendgrid_ruby/version'
	require 'sendgrid_ruby/email'
	require 'dotenv'

	config = Dotenv.load
	sendgrid_username = 'app30181830@heroku.com'	#ENV["SENDGRID_USERNAME"]
	sendgrid_password = 'malamute'	#ENV["SENDGRID_PASSWORD"]
	from = 'apnero@gmail.com'
	tos = 'andrew.nero@gmail.com'

	email = SendgridRuby::Email.new
	email.add_to('andrew.nero@gmail.com')
	.set_from(apnero@gmail.com)
	.set_subject("Subject goes here")
	.set_text("Hello World!")
	.set_html("<strong>Hello World!</strong>")

	sendgrid = SendgridRuby::Sendgrid.new(sendgrid_username, sendgrid_password)
	sendgrid.debug_output = true # remove comment if you need to see the request
	response = sendgrid.send(email)
	response.message = "success"
	puts response
	


end


before do  
    response.headers['Cache-Control'] = 'public, max-age=36000'
end

not_found do  
    File.read('/_site/404.html')
end


get '/*' do  
    file_name = "_site#{request.path_info}/index.html".gsub(%r{\/+},'/')
    if File.exists?(file_name)
    File.read(file_name)
    else
    raise Sinatra::NotFound
    end
end