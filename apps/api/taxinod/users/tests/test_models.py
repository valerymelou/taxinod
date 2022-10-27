import pytest
from django.core import mail

from taxinod.core.tests import BaseTestCase
from taxinod.users.models import User


class TestUserManager(BaseTestCase):
    def setUp(self) -> None:
        self.user_manager = User.objects

    def test_create_user(self):
        user = self.user_manager.create_user("test@bries.cm")

        assert user.email == "test@bries.cm"

    def test_create_user_fail(self):
        with pytest.raises(ValueError) as exception:
            self.user_manager.create_user("", "password")

        assert "The given email address must be set" == str(exception.value)

    def test_create_superuser(self):
        superuser = self.user_manager.create_superuser("test@bries.cm")

        assert superuser.is_staff is True
        assert superuser.is_superuser is True

    def test_create_superuser_fail(self):
        extra_fields = {"is_staff": False, "is_superuser": True}
        with pytest.raises(ValueError) as exception:
            self.user_manager.create_superuser("test@bries.cm", None, **extra_fields)

        assert "Superuser must have is_staff=True." == str(exception.value)

        extra_fields["is_staff"] = True
        extra_fields["is_superuser"] = False
        with pytest.raises(ValueError) as exception:
            self.user_manager.create_superuser("test@bries.cm", None, **extra_fields)

        assert "Superuser must have is_superuser=True." == str(exception.value)


class TestUser(BaseTestCase):
    def setUp(self):
        self.user = self.make_user()

    def test_get_full_name(self):
        assert self.user.get_full_name() == self.user.email

    def test_get_short_name(self):
        assert self.user.get_short_name() == self.user.email

    def test_email_user(self):
        self.user.email_user("Dummy message", "This is a dummy message")
        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == "Dummy message"
