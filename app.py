from init import create_app
from worker import celery_init_app
from task import daily_reminder,monthly_report,send_warning
from celery.schedules import crontab

app=create_app()
celery_app=celery_init_app(app)

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        #crontab(hour=13, minute=0),
        10.0,
        daily_reminder.s(), 
        name='add every day'
        )
    sender.add_periodic_task(
        #30.0,
        crontab(hour=18, minute=0, day_of_month=1, month_of_year='*/1'), 
        monthly_report.s(), 
        name='add every month'
        )
    sender.add_periodic_task(
        #crontab(hour=15, minute=0),
        20.0,
        send_warning.s(), 
        name='add every warning'
        )

if __name__=='__main__':
    app.run(debug=True)