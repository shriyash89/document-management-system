const fileData = {
    fileId : 1234,
    created : "2025-03-01",
    versions : [{
        "id" : 1,
        "name" : "version 1",
        "state" : "Draft",
        "author" : "ShriRaj",
        "created" : "2025-03-01",
        "review"  :  "2025-03-10",
        "approval" : "2025-03-15",
        "publication" : "2025-03-20",
        "expiration" : "2025-03-25",
        "changes" : "no changes, first version"
      },
      {
        "id" : 2,
        "name" : "version 2",
        "state" : "Draft",
        "author" : "ShriRam",
        "created" : "2025-03-04",
        "review"  :  "2025-03-10",
        "approval" : "2025-03-15",
        "publication" : "2025-04-21",
        "expiration" : "2025-04-25",
        "changes" : "publication changed"
      }
    ]
}

export default fileData