# library-management-system-v2
A Modern Application Development 2 project to make a simple 
library managemement system where readers can read books.
# started local development
# useful commands for git
git add . [to move modifications to staging area]
git commit -m "any comment" [to commit the changes]
git push [push the changes to git repo]/ git push -u origin main [for 1st time]
git status [to check status]
touch {filename} [to create a new .md file]
# venv in wsl 
python3 -m venv {env name} [to create venv]
. {env name}/bin/activate [to activate venv]
deactivate [to deactivate]
# started building app
created backend login system.
To create default admin hit [http GET :5000/admin] on another wsl terminal while server is running.
completed frontend login system and now will continue to admin functionalities.
added edit profile for both admin and user.
created crud functions for sections.
created crud functions for books.
created search for both admin and users.
created rate and request books for users.
completed admin and user functionalities.
created homepages for user and admin respectively.
completed backend schedule jobs and user triggered async export.
# for proper functioning of scheduled and async backend jobs
open 4 separate wsl terminals and run with respective commands-
terminal 1 runs flask app [python3 app.py]
terminal 2 runs celery workers [celery -A app:celery_app worker -l INFO]
terminal 3 runs mailhog [~/go/bin/MailHog]
terminal 4 runs celery beat (schedule tasks) [celery -A app:celery_app beat -l INFO]
# completed the development.