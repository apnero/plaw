before do
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['POST']
end

set :protection, false
set :public_dir, Proc.new { File.join(root, "_site") }

post '/send_email' do

	# -*- encoding: utf-8 -*-
	require 'sendgrid_ruby'
	require 'sendgrid_ruby/version'
	require 'sendgrid_ruby/email'

	sendgrid = SendgridRuby::Sendgrid.new('apnero', 'malamute')

	mail = SendgridRuby::Email.new
	mail.add_to('andrew.nero@gmail.com')
		.set_from('andrew.nero@gmail.com')
		.set_subject('Subject goes here')
		.set_text('Hello Wofdsfdsrdld!')
		.set_html('<strong>Hello World!</strong>')

	response = sendgrid.send(mail)
	puts response
	
end