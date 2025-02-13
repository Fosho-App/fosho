/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/fosho_program.json`.
 */
export type FoshoProgram = {
  "address": "FhtVsW3qx9Qpz3bsbQXsVU1wjfqzw7ee6q1Wv2QQEsS6",
  "metadata": {
    "name": "foshoProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cancelEvent",
      "discriminator": [
        55,
        143,
        36,
        45,
        59,
        241,
        89,
        119
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              },
              {
                "kind": "account",
                "path": "event.nonce",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "community",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "community"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "claimRewards",
      "discriminator": [
        4,
        144,
        132,
        71,
        116,
        23,
        151,
        80
      ],
      "accounts": [
        {
          "name": "attendeeRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  116,
                  116,
                  101,
                  110,
                  100,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee_record.owner",
                "account": "attendee"
              }
            ]
          }
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              },
              {
                "kind": "account",
                "path": "event.nonce",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "community",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "optional": true
        },
        {
          "name": "rewardAccount",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "rewardMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "receiverAccount",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "claimer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "rewardMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "eventCollection",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "claimer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "createCommunity",
      "discriminator": [
        203,
        214,
        176,
        194,
        13,
        207,
        22,
        60
      ],
      "accounts": [
        {
          "name": "community",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "pubkey"
        },
        {
          "name": "communityName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              },
              {
                "kind": "account",
                "path": "community.events_count",
                "account": "community"
              }
            ]
          }
        },
        {
          "name": "eventCollection",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "community",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "optional": true
        },
        {
          "name": "rewardAccount",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "rewardMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "senderAccount",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "rewardMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "community"
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "eventType",
          "type": {
            "defined": {
              "name": "eventType"
            }
          }
        },
        {
          "name": "organizer",
          "type": "string"
        },
        {
          "name": "commitmentFee",
          "type": "u64"
        },
        {
          "name": "eventStartsAt",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "eventEndsAt",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "registrationStartsAt",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "registrationEndsAt",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "capacity",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "location",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "virtualLink",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "description",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "eventVersion",
          "type": {
            "defined": {
              "name": "eventVersion"
            }
          }
        },
        {
          "name": "rewardPerUser",
          "type": "u64"
        },
        {
          "name": "eventAuthorities",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "authorityMustSign",
          "type": "bool"
        }
      ]
    },
    {
      "name": "joinEvent",
      "discriminator": [
        10,
        93,
        234,
        137,
        237,
        194,
        224,
        0
      ],
      "accounts": [
        {
          "name": "attendeeRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  116,
                  116,
                  101,
                  110,
                  100,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee"
              }
            ]
          }
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event.community",
                "account": "event"
              },
              {
                "kind": "account",
                "path": "event.nonce",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "community",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          }
        },
        {
          "name": "eventCollection",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "eventAuthority",
          "docs": [
            "if it exists they would have to sign this transaction"
          ]
        },
        {
          "name": "attendee",
          "writable": true,
          "signer": true
        },
        {
          "name": "ticket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee"
              },
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "rejectAttendee",
      "discriminator": [
        107,
        232,
        196,
        121,
        206,
        17,
        60,
        101
      ],
      "accounts": [
        {
          "name": "attendeeRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  116,
                  116,
                  101,
                  110,
                  100,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee_record.owner",
                "account": "attendee"
              }
            ]
          }
        },
        {
          "name": "event",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              },
              {
                "kind": "account",
                "path": "event.nonce",
                "account": "event"
              }
            ]
          },
          "relations": [
            "attendeeRecord"
          ]
        },
        {
          "name": "community",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "eventCollection",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "ticket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee_record.owner",
                "account": "attendee"
              },
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "owner"
        },
        {
          "name": "eventAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": []
    },
    {
      "name": "verifyAttendee",
      "discriminator": [
        135,
        180,
        176,
        53,
        172,
        153,
        216,
        151
      ],
      "accounts": [
        {
          "name": "attendeeRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  116,
                  116,
                  101,
                  110,
                  100,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee_record.owner",
                "account": "attendee"
              }
            ]
          }
        },
        {
          "name": "event",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              },
              {
                "kind": "account",
                "path": "event.nonce",
                "account": "event"
              }
            ]
          },
          "relations": [
            "attendeeRecord"
          ]
        },
        {
          "name": "community",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  117,
                  110,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "community.seed",
                "account": "community"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "eventCollection",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "ticket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "attendee_record.owner",
                "account": "attendee"
              },
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "owner"
        },
        {
          "name": "eventAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "attendee",
      "discriminator": [
        231,
        172,
        150,
        240,
        220,
        165,
        51,
        65
      ]
    },
    {
      "name": "baseAssetV1",
      "discriminator": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "name": "baseCollectionV1",
      "discriminator": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "name": "community",
      "discriminator": [
        192,
        73,
        211,
        158,
        178,
        81,
        19,
        112
      ]
    },
    {
      "name": "event",
      "discriminator": [
        125,
        192,
        125,
        158,
        9,
        115,
        152,
        233
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCommunityAuthority",
      "msg": "Invalid Community Authority"
    },
    {
      "code": 6001,
      "name": "invalidRegistrationEndTime",
      "msg": "Registration end time cannot exceed the event start time"
    },
    {
      "code": 6002,
      "name": "invalidEventStartTime",
      "msg": "The event must start in a future."
    },
    {
      "code": 6003,
      "name": "registrationNotStarted",
      "msg": "The registration period has not started yet"
    },
    {
      "code": 6004,
      "name": "registrationEnded",
      "msg": "The registration period has ended"
    },
    {
      "code": 6005,
      "name": "maximumTicketsReached",
      "msg": "The maximum number of tickets has been reached"
    },
    {
      "code": 6006,
      "name": "attendeeStatusPending",
      "msg": "The rewards cannot be claimed during the pending status"
    },
    {
      "code": 6007,
      "name": "invalidClaimer",
      "msg": "Not a valid claimer"
    },
    {
      "code": 6008,
      "name": "accountNotProvided",
      "msg": "One of the accounts required for this ix is not provided"
    },
    {
      "code": 6009,
      "name": "alreadyClaimed",
      "msg": "this attendee has already claimed the rewards"
    },
    {
      "code": 6010,
      "name": "missingAttribute",
      "msg": "The attribute is missing"
    },
    {
      "code": 6011,
      "name": "numericalOverflow",
      "msg": "Numerical Overflow"
    },
    {
      "code": 6012,
      "name": "eventAuthorityMustSign",
      "msg": "Event Authority must sign"
    },
    {
      "code": 6013,
      "name": "invalidEventAuthority",
      "msg": "Event Authority Publickey mismatch"
    },
    {
      "code": 6014,
      "name": "alreadyScanned",
      "msg": "Ticket has been signed already"
    },
    {
      "code": 6015,
      "name": "eventCancelled",
      "msg": "Event is cancelled"
    },
    {
      "code": 6016,
      "name": "eventHasNotEnded",
      "msg": "Event has not ended"
    },
    {
      "code": 6017,
      "name": "eventHasNotStarted",
      "msg": "Event has not started"
    },
    {
      "code": 6018,
      "name": "eventEnded",
      "msg": "Event has ended"
    },
    {
      "code": 6019,
      "name": "invalidCollection",
      "msg": "Invalid Collection"
    },
    {
      "code": 6020,
      "name": "invalidCollectionDetails",
      "msg": "Invalid Collection Details"
    },
    {
      "code": 6021,
      "name": "nftNotVerified",
      "msg": "Nft Not Verified"
    },
    {
      "code": 6022,
      "name": "collectionMissing",
      "msg": "Collection Key is Missing"
    },
    {
      "code": 6023,
      "name": "verifiedCreatorMissing",
      "msg": "A verified creator is missing"
    },
    {
      "code": 6024,
      "name": "invalidCreator",
      "msg": "Invalid nft creator"
    },
    {
      "code": 6025,
      "name": "noCreatorsPresentOnMetadata",
      "msg": "No creators on metadata"
    },
    {
      "code": 6026,
      "name": "publicKeyMismatch",
      "msg": "Public Key mismatch"
    },
    {
      "code": 6027,
      "name": "wrongAccountOwner",
      "msg": "Incorrect account owner"
    },
    {
      "code": 6028,
      "name": "notEnoughRemainingAccounts",
      "msg": "Not enough remaining accounts provided"
    },
    {
      "code": 6029,
      "name": "invalidTokenDetails",
      "msg": "User may not have enough tokens or incorrect data has been supplied"
    }
  ],
  "types": [
    {
      "name": "attendee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "attendeeStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "attendeeStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "verified"
          },
          {
            "name": "rejected"
          },
          {
            "name": "claimed"
          }
        ]
      }
    },
    {
      "name": "baseAssetV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": {
              "defined": {
                "name": "key"
              }
            }
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "updateAuthority",
            "type": {
              "defined": {
                "name": "updateAuthority"
              }
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "seq",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "baseCollectionV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": {
              "defined": {
                "name": "key"
              }
            }
          },
          {
            "name": "updateAuthority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "numMinted",
            "type": "u32"
          },
          {
            "name": "currentSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "community",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "eventsCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "community",
            "type": "pubkey"
          },
          {
            "name": "rewardMint",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "eventVersion",
            "type": {
              "defined": {
                "name": "eventVersion"
              }
            }
          },
          {
            "name": "eventAuthorities",
            "docs": [
              "4 event authorities are allowed."
            ],
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "commitmentFee",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "nonce",
            "type": "u32"
          },
          {
            "name": "rewardPerUser",
            "type": "u64"
          },
          {
            "name": "isCancelled",
            "type": "bool"
          },
          {
            "name": "authorityMustSign",
            "docs": [
              "in all cases, event authority must sign the attendance.",
              "if this is true. event authority must sign the join event instruction."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "eventType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "inPerson"
          },
          {
            "name": "virtual"
          },
          {
            "name": "exhibition"
          },
          {
            "name": "conference"
          },
          {
            "name": "concert"
          },
          {
            "name": "sportingEvent"
          },
          {
            "name": "workshop"
          },
          {
            "name": "webinar"
          },
          {
            "name": "networkingEvent"
          },
          {
            "name": "other",
            "fields": [
              "string"
            ]
          }
        ]
      }
    },
    {
      "name": "eventVersion",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "regular"
          },
          {
            "name": "nftGated",
            "fields": [
              {
                "defined": {
                  "name": "nftData"
                }
              }
            ]
          },
          {
            "name": "tokenGated",
            "fields": [
              {
                "defined": {
                  "name": "tokenData"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "key",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "uninitialized"
          },
          {
            "name": "assetV1"
          },
          {
            "name": "hashedAssetV1"
          },
          {
            "name": "pluginHeaderV1"
          },
          {
            "name": "pluginRegistryV1"
          },
          {
            "name": "collectionV1"
          }
        ]
      }
    },
    {
      "name": "nftData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionMint",
            "docs": [
              "mpl token metadata collection"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "verifiedCreator",
            "docs": [
              "mpl token metadata verified creator pubkey"
            ],
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "tokenData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "token mint of the token that must be held by the owner"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "minimumAmount",
            "docs": [
              "minimum amount held by the owner"
            ],
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "updateAuthority",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "address",
            "fields": [
              "pubkey"
            ]
          },
          {
            "name": "collection",
            "fields": [
              "pubkey"
            ]
          }
        ]
      }
    }
  ]
};
