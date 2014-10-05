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