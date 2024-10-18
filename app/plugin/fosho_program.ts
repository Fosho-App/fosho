export type FoshoProgram = {
  "address": "DQzCnhf6qTaz2tPPj6jvicntC9hP2tqDzZp1RWKujXdT",
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
          "writable": true
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
        }
      ],
      "args": [
        {
          "name": "maxAttendees",
          "type": "u32"
        },
        {
          "name": "commitmentFee",
          "type": "u64"
        },
        {
          "name": "eventStartTime",
          "type": "i64"
        },
        {
          "name": "registrationEndTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "rewardPerUser",
          "type": "u64"
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
          "name": "attendee",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
          "writable": true
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
          "name": "authority",
          "signer": true,
          "relations": [
            "community"
          ]
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
      "name": "registrationTimeExpired",
      "msg": "Registration time has been expired"
    },
    {
      "code": 6004,
      "name": "maxAttendeesAlreadyJoined",
      "msg": "The maximum allowed attendees have already joined"
    },
    {
      "code": 6005,
      "name": "attendeeStatusPending",
      "msg": "The rewards cannot be claimed during the pending status"
    },
    {
      "code": 6006,
      "name": "invalidClaimer",
      "msg": "Not a valid claimer"
    },
    {
      "code": 6007,
      "name": "accountNotProvided",
      "msg": "One of the accounts required for this ix is not provided"
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
            "name": "commitmentFee",
            "type": "u64"
          },
          {
            "name": "eventStartTime",
            "type": "i64"
          },
          {
            "name": "maxAttendees",
            "type": "u32"
          },
          {
            "name": "registrationEndTime",
            "type": "i64"
          },
          {
            "name": "currentAttendees",
            "type": "u32"
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
          }
        ]
      }
    }
  ]
};
