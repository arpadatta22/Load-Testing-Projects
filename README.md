Dear,
I’ve completed performance test on frequently used web pages for Bangla Puzzle.com.
I take API b using BlazeMeter and also added API manually.
Test executed for the below-mentioned scenario in server 000.000.000.00.
1 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 1.7 And Total Concurrent API requested: 145.
5 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 8 And Total Concurrent API requested: 725.
8 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 10.63 And Total Concurrent API requested: 1160.
9 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 12 And Total Concurrent API requested: 1305.
While executing 9 concurrent requests, found 26 requests got connection timeout and an error rate is 0.84%.
Summary: The server can handle almost concurrent 1305 API call with almost zero (0) error rate.
Please find the details report in the attachment and let me know if you have any further queries.
