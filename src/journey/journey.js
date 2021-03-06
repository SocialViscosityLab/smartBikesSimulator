/**
 * A journey is the travel of at least one leader that might be followed by cyclists. Each journey is labeled with an ID.
 * It has a collection of sessions: \n
 * Session 0: the lead agent \n
 * Session n: the nth follower \n
 * @param {string} id The journey id
 * @param {Route} route The reference route ran by the lead agent
 */
class Journey {
    constructor(id, route) {
        this.id = id;
        this.referenceRoute = route;
        this.sessions = [];
    }

    /**
     * The observer notify() function. Instances of this class observe an instance of Cyclist class
     */
    notify(data) {
        // Do something 
    }

    /**
    * Adds a new session to the journey. The session ID is the position in the collection
    *@param {Session} session The session to be added. If omited, the sessions length
    is used as index for a new session
    */
    addNewSession(session) {

        if (session) {
            // verify that there is no session with the same id
            if (this.getSession(session.id_user) == undefined) {

                this.sessions.push(session);

                console.log("New session id: ", this.getLastSession().id_user, " added to journey " + this.id);

            } else {
                window.alert("Session ID conflict " + session.id_user + "No session added");
            }

        } else {
            // verify that there is no session with the same id
            if (this.getSession(this.sessions.length) == undefined) {

                this.sessions.push(new Session(this.sessions.length, new Date()));

                console.log("New session id: " + this.getLastSession().id_user + " added to journey " + this.id);

            } else {
                window.alert("Session ID conflict " + this.getLastSession().id_user + "No session added");
            }
        }
    }

    /**
     * Gets the session by ID
     * @param {Session} id The session that match the id
     */
    getSession(id) {
        for (let ssn of this.sessions) {
            if (ssn.id_session.id == id) {
                return ssn;
            }
        }
        return undefined;
    }

    /**
     * Gets the last session added to the journey
     */
    getLastSession() {
        return this.sessions[this.sessions.length - 1];
    }

    /**
    * Enables the route. It means that the route of this journey is running.
    The route is dissabled by default. It is disabled when the leader reaches the end of the route
    * @param {Boolean} bool True if the session status needs to be true.
    */
    activateRoute(bool) {
        this.referenceRoute.status = bool;
    }

    /**
     * Executes the leader/ghosts session
     *@param {number} sampleRate Integer value with sampling rate in seconds
     */
    runGhost(sampleRate) {
        let tmp = this.sessions[0].runStep(this.referenceRoute, sampleRate); //runSession (route, speed, sampleRate in milliseconds)
        // add the latest dataPoint to the tail of the green wave
        if (tmp != undefined) {
            this.greenWaveDataPoints.push(tmp);
        }
        // remove the first datapoint
        this.greenWaveDataPoints.shift();
    }

    setGhostSessionPoints(speed, sampleRate) {
        this.sessions[0].setSessionPoints(this.referenceRoute, speed, sampleRate); //route, speed, sampleRate
    }

    isLeaderSessionActive() {
        let rtn = false;
        let tmpGhostSession = this.getSession('00000');
        // if ()
    }

    // /**
    // * Executes all the sessions in this journey
    // *@param {number} speed The cyclists speed in meters per second. WARNING It applies to ALL cyclists
    // *@param {number} sampleRate Integer value with sampling rate in seconds
    // */
    // runSessions(sampleRate){
    // 	// run ghost session
    // 	this.runGhost(sampleRate);
    // 	// run all other sessions
    // 	for (var i = 1; i < this.sessions.length; i++) {
    // 		this.sessions[i].runStep (this.referenceRoute, sampleRate);
    // 	}
    // }
    //
    // /**
    // * Executes the especified session
    // *@param {string} id The cyclists ID
    // *@param {number} speed The cyclists speed in meters per second
    // *@param {number} sampleRate Integer value with sampling rate in seconds
    // */
    // runSession(id,sampleRate){
    // 	if (this.sessions[id] != undefined){
    // 		if (id == 0){
    // 			this.runGhost();
    // 		}else {
    // 			this.sessions[id].runStep (this.referenceRoute, sampleRate); //runSession (route, speed, sampleRate in milliseconds)
    // 		}
    // 	}
    // }

    /**
     * returns true if the any point of the route is whithin the subscritpionRange radius from the currentLocation.
     * The subscription range radius is a property of the route
     * @param {Position} currentLocation The location to be validated
     */
    validateSubscription(currentLocation) {

        return true; // rewrite this function

    }
}