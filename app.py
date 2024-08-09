from init import create_app
from worker import celery_init_app
from task import daily_reminder,monthly_report
from celery.schedules import crontab

app=create_app()
celery_app=celery_init_app(app)

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=18, minute=0), 
        daily_reminder.s(), 
        name='add every day'
        )
    sender.add_periodic_task(
        crontab(hour=18, minute=0, day_of_month=1, month_of_year='*/1'), 
        monthly_report.s(), 
        name='add every month'
        )

if __name__=='__main__':
    app.run(debug=True)