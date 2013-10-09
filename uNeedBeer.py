#! /usr/bin/env python
# -*- coding: UTF-8 -*-

"""
Assignment 5


[Due Date: 10/8/2013]


author = "Shreyas"
email = "shreyas@ischool.berkeley.edu"
python_version = "Python 2.7.5 :: Anaconda 1.6.1 (x86_64)"
"""

from __future__ import division
from subprocess import call

import serial

# import sys


def getArduino():
    """
    Get serial input from Arduino
    """

    serialVals = []

    listen=True

    while listen:
        ser = serial.Serial('/dev/tty.usbmodem1421', 9600)
        val = ser.readline()

        try:
            num = int(val)
        except:
            num = 0

        if num != 0:
            serialVals.append(num)

        if len(serialVals) > 3 and serialVals[-1] == serialVals[-2] and serialVals[-2] != 0:
            listen = False

    #get 1 value
    meanVal = int(sum(serialVals) / float(len(serialVals)))
    print serialVals, meanVal

    fillBeer(meanVal)

def fillBeer(bVal):
    """
    fill beer mug
    """

    url = 'http://localhost/beerviz/draft.html?beer=' + str(bVal)

    app = '/Applications/Firefox.app/Contents/MacOS/firefox'

    call([app, url])

def main():
    getArduino()



if __name__ == '__main__':
    main()
