angular.module('restaurantApp').service('eventSvc', function($http){

    this.submitEmail = function(firstName, lastName, email, phone, guests, occasion, date, location, instructions) {

        return $http({
            method: 'post',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': "Ox36XW_qxI8qjR4Dbr522w",
                'message': {
                    'from_email': 'me@adammcnevin.com',
                    'to': [
                        {
                            'email': 'miknevinas@gmail.com', 
                            'type': 'to'
                        }
                    ],
                    'autotext':'true',
                    'subject': 'Event inquiry from:'+ ' ' + firstName + ' ' + lastName,
                    'text': email + ' ' + phone + ' ' + guests + ' ' + occasion + ' ' + date + ' ' +location + ' ' + instructions 
                }
            }
        })
    } 
})