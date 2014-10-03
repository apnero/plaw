require 'rubygems'  
require 'sinatra'  
require 'rack/recaptcha'

use Rack::Recaptcha, :public_key => '6LdIIvsSAAAAALI3bWd2cp-MZAMxYc9ZwmPNexpZ', :private_key => '6LdIIvsSAAAAAADWt6Ti8laUDcJvNXKOFy_oVLEw'
helpers Rack::Recaptcha::Helpers  
enable :sessions

require './application'  
run Sinatra::Application