if [ ! -d "/home/node/.aws" ]
then
    mkdir /home/node/.aws
fi

subdomain="kikoda"
account=""
roleName="SystemAdministrator"

echo "[default]" > /home/node/.aws/config
echo "sso_start_url = https://$subdomain.awsapps.com/start" >> /home/node/.aws/config
echo "sso_region = us-east-1" >> /home/node/.aws/config
echo "sso_account_id = $account" >> /home/node/.aws/config
echo "sso_role_name = $roleName" >> /home/node/.aws/config
echo "region = us-east-1" >> /home/node/.aws/config
echo "output = json" >> /home/node/.aws/config
echo "[profile nica]" >> /home/node/.aws/config
echo "sso_start_url = https://$subdomain.awsapps.com/start" >> /home/node/.aws/config
echo "sso_region = us-east-1" >> /home/node/.aws/config
echo "sso_account_id = $account" >> /home/node/.aws/config
echo "sso_role_name = $roleName" >> /home/node/.aws/config
echo "region = us-east-1" >> /home/node/.aws/config
echo "output = json" >> /home/node/.aws/config