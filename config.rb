require 'rubygems'
require 'sinatra'
require 'json'
require 'rack/recaptcha'
require 'pony'

use Rack::Recaptcha, :public_key => '6LdIIvsSAAAAALI3bWd2cp-MZAMxYc9ZwmPNexpZ', :private_key => 6LdIIvsSAAAAAADWt6Ti8laUDcJvNXKOFy_oVLEw'
helpers Rack::Recaptcha::Helpers

require './application'
run Sinatra::Application