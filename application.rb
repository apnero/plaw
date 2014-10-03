set :public, Proc.new { File.join(root, "_site") }


post '/send' do  
  if recaptcha_valid?
    session[:captcha] = true
    { :message => 'success' }.to_json
  else
    session[:captcha] = false
    { :message => 'success' }.to_json
  end
end

post '/send_email' do  
	

	# -*- encoding: utf-8 -*-
	require 'sendgrid_ruby'
	require 'sendgrid_ruby/version'
	require 'sendgrid_ruby/email'
	require 'dotenv'

	config = Dotenv.load
	sendgrid_username = ENV["SENDGRID_USERNAME"]
	sendgrid_password = ENV["SENDGRID_PASSWORD"]
	from = ENV["FROM"]
	tos = ENV["TOS"].split(',')

	email = SendgridRuby::Email.new
	email.set_tos(tos)
	.set_from(from)
	.set_from_name("From name")
	.set_subject("[sendgrid-ruby-example] Owl named fullname")
	.set_text("familyname, what are you doing?\r\n He is in place.")
	.set_html("<strong> familyname, what are you doing?</strong><br />He is in place.")
	.add_section('office', 'Nakano')
	.add_section('home', 'Meguro')
	.add_category('Category1')
	.add_header('X-Sent-Using', 'SendGrid-API')

	sendgrid = SendgridRuby::Sendgrid.new(sendgrid_username, sendgrid_password)
	#sendgrid.debug_output = true # remove comment if you need to see the request
	response = sendgrid.send(email)
	puts response



end


before do  
    response.headers['Cache-Control'] = 'public, max-age=36000'
end

not_found do  
    File.read('_site/404.html')
end

get '/*' do  
    file_name = "_site#{request.path_info}/index.html".gsub(%r{\/+},'/')
    if File.exists?(file_name)
    File.read(file_name)
    else
    raise Sinatra::NotFound
    end
end